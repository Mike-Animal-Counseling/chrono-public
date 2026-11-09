import { z } from "zod";
import { TASK_PRIORITIES, TASK_STATUSES, MEMBER_ROLES } from "./types";

export const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD")
  .refine((value) => {
    const date = new Date(`${value}T00:00:00.000Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, "date must be a real calendar date");

const nullableIsoDate = isoDate.nullable();

const title = z.string().trim().min(1).max(200);

export const commandSchemas = {
  "task.worker.configure": z.object({
    taskId: z.string().min(1),
    workerId: z.string().min(1).max(100).nullable().optional(),
    requiredSkills: z.array(z.string().trim().toLowerCase().regex(/^[a-z0-9][a-z0-9-]{0,39}$/)).max(12).optional(),
  }).refine((p) => p.workerId !== undefined || p.requiredSkills !== undefined),
  "project.update": z.object({
    name: title.optional(),
    launchDate: nullableIsoDate.optional(),
  }),
  "task.create": z.object({
    taskId: z.string().regex(/^task_[a-f0-9]{20,32}$/).optional(),
    title,
    description: z.string().max(20000).optional(),
    status: z.enum(TASK_STATUSES).optional(),
    priority: z.enum(TASK_PRIORITIES).optional(),
    startDate: nullableIsoDate.optional(),
    dueDate: nullableIsoDate.optional(),
    estimateMinutes: z.number().int().positive().max(100000).nullable().optional(),
    assigneeIds: z.array(z.string()).max(20).optional(),
  }),
  "task.update": z.object({
    taskId: z.string(),
    patch: z.object({
      title: title.optional(),
      description: z.string().max(20000).optional(),
      priority: z.enum(TASK_PRIORITIES).optional(),
      startDate: nullableIsoDate.optional(),
      dueDate: nullableIsoDate.optional(),
      estimateMinutes: z.number().int().positive().max(100000).nullable().optional(),
      remainingEstimateMinutes: z.number().int().min(0).max(100000).nullable().optional(),
      status: z.enum(TASK_STATUSES).optional(),
    }),
    // Optimistic concurrency for the description: when present, the command
    // is rejected if the server-side description moved past this version.
    expectedDescriptionVersion: z.number().int().min(1).optional(),
  }),
  "task.move": z.object({
    taskId: z.string(),
    status: z.enum(TASK_STATUSES),
    order: z.number().int().min(0),
  }),
  "task.delete": z.object({ taskId: z.string() }),
  "task.restore": z.object({ taskId: z.string() }),
  "task.assign": z.object({ taskId: z.string(), userId: z.string() }),
  "task.unassign": z.object({ taskId: z.string(), userId: z.string() }),
  "dependency.add": z.object({ fromTaskId: z.string(), toTaskId: z.string() }),
  "dependency.remove": z.object({ dependencyId: z.string() }),
  "member.add": z.object({
    userId: z.string(),
    role: z.enum(MEMBER_ROLES).optional(),
    name: z.string().trim().min(1).max(120).optional(),
  }),
  "member.setRole": z.object({ userId: z.string(), role: z.enum(MEMBER_ROLES) }),
  "member.remove": z.object({ userId: z.string() }),
  "scenario.create": z.object({
    name: title,
    baseSeq: z.number().int().nonnegative().optional(),
  }),
  "scenario.rename": z.object({ name: title }),
  "scenario.archive": z.object({}),
  "scenario.rebase": z.object({}),
  "scenario.apply": z.object({}),
} satisfies Record<string, z.ZodType>;

export type CommandType = keyof typeof commandSchemas;

export type CommandPayload<T extends CommandType> = z.infer<(typeof commandSchemas)[T]>;

export interface CommandEnvelope<T extends CommandType = CommandType> {
  type: T;
  projectId: z.infer<typeof z.string>;
  clientMutationId: string;
  baseSeq?: number;
  payload: CommandPayload<T>;
}

export const commandEnvelopeSchema: z.ZodType<CommandEnvelope> = z.object({
  type: z.enum(Object.keys(commandSchemas) as [CommandType, ...CommandType[]]),
  projectId: z.string().min(1),
  clientMutationId: z.string().min(8).max(120),
  baseSeq: z.number().int().nonnegative().optional(),
  payload: z.record(z.string(), z.unknown()),
}) as unknown as z.ZodType<CommandEnvelope>;

export function parseCommand(input: unknown): CommandEnvelope {
  const env = commandEnvelopeSchema.parse(input);
  const payloadSchema = commandSchemas[env.type];
  const payload = payloadSchema.parse(env.payload ?? {});
  return { ...env, payload } as CommandEnvelope;
}

// --- Structured AI scenario tools -------------------------------------------

export const scenarioChangeSchema = z.discriminatedUnion("tool", [
  z.object({
    tool: z.literal("task.reschedule"),
    taskId: z.string().min(1),
    params: z
      .object({ startDate: nullableIsoDate.optional(), dueDate: nullableIsoDate.optional() })
      .refine((p) => p.startDate !== undefined || p.dueDate !== undefined, {
        message: "reschedule requires at least one date",
      }),
    reason: z.string().max(500),
  }),
  z.object({
    tool: z.literal("task.reestimate"),
    taskId: z.string().min(1),
    params: z.object({ estimateMinutes: z.number().int().positive().max(100000) }),
    reason: z.string().max(500),
  }),
  z.object({
    tool: z.literal("task.reprioritize"),
    taskId: z.string().min(1),
    params: z.object({ priority: z.enum(TASK_PRIORITIES) }),
    reason: z.string().max(500),
  }),
  z.object({
    tool: z.literal("task.descope"),
    taskId: z.string().min(1),
    reason: z.string().max(500),
  }),
  z.object({
    tool: z.literal("launch.move"),
    params: z.object({ launchDate: isoDate }),
    reason: z.string().max(500),
  }),
]);

export const scenarioSuggestionSchema = z.object({
  name: z.string().trim().min(1).max(120),
  rationale: z.string().max(2000),
  source: z.enum(["deterministic", "llm"]),
  changes: z.array(scenarioChangeSchema).min(1).max(10),
});
