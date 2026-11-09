export const TASK_STATUSES = ["todo", "doing", "waiting", "done"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  doing: "In Progress",
  waiting: "Waiting",
  done: "Done",
};

export const TASK_PRIORITIES = ["low", "medium", "high", "urgent"] as const;
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

export const MEMBER_ROLES = ["OWNER", "ADMIN", "MEMBER", "VIEWER"] as const;
export type MemberRole = (typeof MEMBER_ROLES)[number];

export type DependencyType = "BLOCKS";

export type EventType =
  | "project.created"
  | "project.updated"
  | "task.created"
  | "task.title_changed"
  | "task.description_changed"
  | "task.status_changed"
  | "task.priority_changed"
  | "task.dates_changed"
  | "task.estimate_changed"
  | "task.assignee_added"
  | "task.assignee_removed"
  | "task.worker_changed"
  | "task.moved"
  | "task.completed"
  | "task.reopened"
  | "task.deleted"
  | "task.restored"
  | "dependency.added"
  | "dependency.removed"
  | "member.added"
  | "member.role_changed"
  | "member.removed";

export interface ProjectCreatedPayload {
  name: string;
  launchDate: string | null;
}
export interface ProjectUpdatedPayload {
  name?: string;
  launchDate?: string | null;
}
export interface TaskCreatedPayload {
  taskId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string | null;
  dueDate: string | null;
  estimateMinutes: number | null;
  remainingEstimateMinutes: number | null;
  assigneeIds: string[];
}
export interface TaskTitleChangedPayload {
  taskId: string;
  from: string;
  to: string;
}
export interface TaskDescriptionChangedPayload {
  taskId: string;
  to: string;
  version: number;
}
export interface TaskStatusChangedPayload {
  taskId: string;
  from: TaskStatus;
  to: TaskStatus;
  order: number;
}
export interface TaskPriorityChangedPayload {
  taskId: string;
  from: TaskPriority;
  to: TaskPriority;
}
export interface TaskDatesChangedPayload {
  taskId: string;
  from: { startDate: string | null; dueDate: string | null };
  to: { startDate: string | null; dueDate: string | null };
}
export interface TaskEstimateChangedPayload {
  taskId: string;
  from: { estimateMinutes: number | null; remainingEstimateMinutes: number | null };
  to: { estimateMinutes: number | null; remainingEstimateMinutes: number | null };
}
export interface TaskAssigneeAddedPayload {
  taskId: string;
  userId: string;
}
export interface TaskAssigneeRemovedPayload {
  taskId: string;
  userId: string;
}
export interface TaskMovedPayload {
  taskId: string;
  status: TaskStatus;
  order: number;
}
export interface TaskCompletedPayload {
  taskId: string;
}
export interface TaskReopenedPayload {
  taskId: string;
  status: TaskStatus;
}
export interface TaskDeletedPayload {
  taskId: string;
}
export interface TaskRestoredPayload {
  taskId: string;
}
export interface DependencyAddedPayload {
  dependencyId: string;
  fromTaskId: string;
  toTaskId: string;
  type: DependencyType;
}
export interface DependencyRemovedPayload {
  dependencyId: string;
}
export interface MemberAddedPayload {
  userId: string;
  name: string;
  role: MemberRole;
}
export interface MemberRoleChangedPayload {
  userId: string;
  from: MemberRole;
  to: MemberRole;
}
export interface MemberRemovedPayload {
  userId: string;
}

export interface EventPayloadMap {
  "task.worker_changed": { taskId: string; from: string | null; to: string | null; requiredSkills: string[] };
  "project.created": ProjectCreatedPayload;
  "project.updated": ProjectUpdatedPayload;
  "task.created": TaskCreatedPayload;
  "task.title_changed": TaskTitleChangedPayload;
  "task.description_changed": TaskDescriptionChangedPayload;
  "task.status_changed": TaskStatusChangedPayload;
  "task.priority_changed": TaskPriorityChangedPayload;
  "task.dates_changed": TaskDatesChangedPayload;
  "task.estimate_changed": TaskEstimateChangedPayload;
  "task.assignee_added": TaskAssigneeAddedPayload;
  "task.assignee_removed": TaskAssigneeRemovedPayload;
  "task.moved": TaskMovedPayload;
  "task.completed": TaskCompletedPayload;
  "task.reopened": TaskReopenedPayload;
  "task.deleted": TaskDeletedPayload;
  "task.restored": TaskRestoredPayload;
  "dependency.added": DependencyAddedPayload;
  "dependency.removed": DependencyRemovedPayload;
  "member.added": MemberAddedPayload;
  "member.role_changed": MemberRoleChangedPayload;
  "member.removed": MemberRemovedPayload;
}

export interface ProjectEvent<T extends EventType = EventType> {
  id: string;
  projectId: string;
  seq: number;
  type: T;
  schemaVersion: number;
  payload: EventPayloadMap[T];
  actorUserId: string;
  clientMutationId: string;
  correlationId?: string;
  causationId?: string;
  createdAt: string;
}

export type AnyProjectEvent = {
  [K in EventType]: ProjectEvent<K>;
}[EventType];

export interface TaskState {
  /** Absent on older streams. AI execution is separate from human collaborators. */
  agentWorkerId?: string;
  requiredSkills?: string[];
  id: string;
  title: string;
  description: string;
  descriptionVersion: number;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string | null;
  dueDate: string | null;
  estimateMinutes: number | null;
  remainingEstimateMinutes: number | null;
  assigneeIds: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  lastEventSeq: number;
}

export interface DependencyState {
  id: string;
  fromTaskId: string;
  toTaskId: string;
  type: DependencyType;
}

export interface MemberState {
  userId: string;
  name: string;
  role: MemberRole;
}

export interface ProjectState {
  projectId: string;
  name: string;
  launchDate: string | null;
  createdAt: string;
  updatedAt: string;
  seq: number;
  tasks: Record<string, TaskState>;
  order: Record<TaskStatus, string[]>;
  dependencies: Record<string, DependencyState>;
  members: Record<string, MemberState>;
}

export interface StateDiff {
  fromSeq: number;
  toSeq: number;
  tasksAdded: TaskState[];
  tasksRemoved: TaskState[];
  titleChanges: { taskId: string; from: string; to: string }[];
  statusChanges: { taskId: string; title: string; from: TaskStatus; to: TaskStatus }[];
  priorityChanges: { taskId: string; title: string; from: TaskPriority; to: TaskPriority }[];
  deadlineChanges: { taskId: string; title: string; from: string | null; to: string | null }[];
  estimateChanges: {
    taskId: string;
    title: string;
    from: number | null;
    to: number | null;
  }[];
  assigneeChanges: { taskId: string; title: string; added: string[]; removed: string[]; worker?: { from: string | null; to: string | null; requiredSkills: string[] } }[];
  dependencyAdded: DependencyState[];
  dependencyRemoved: DependencyState[];
  launchDateChange: { from: string | null; to: string | null } | null;
  counts: { from: Record<TaskStatus, number>; to: Record<TaskStatus, number> };
  totalChanges: number;
}

export const DIFF_COLLECTIONS = ["tasksAdded", "tasksRemoved", "titleChanges", "statusChanges", "priorityChanges", "deadlineChanges", "estimateChanges", "assigneeChanges", "dependencyAdded", "dependencyRemoved"] as const;
export type DiffSummary = Pick<StateDiff, "fromSeq" | "toSeq" | "totalChanges" | "launchDateChange"> & {
  changes: Record<(typeof DIFF_COLLECTIONS)[number], number>;
};

export type TemporalContext =
  | { mode: "live" }
  | { mode: "history"; seq: number }
  | { mode: "future"; at: string; projection: "plan" | "forecast" }
  | { mode: "scenario"; scenarioId: string };

export interface ScenarioView {
  id: string;
  projectId: string;
  name: string;
  baseSeq: number;
  status: "ACTIVE" | "APPLIED" | "ARCHIVED";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  mainSeqAtView: number;
  stale: boolean;
}

export interface EntityTouch {
  entity: "task" | "project" | "dependency" | "member";
  entityId: string;
  field: string;
  seq: number;
}

export interface ScenarioConflict {
  entity: EntityTouch["entity"];
  entityId: string;
  field: string;
  mainSeqs: number[];
  scenarioSeqs: number[];
  kind: "both-edited" | "deleted-vs-edited";
}

export interface DivergenceReport {
  scenarioId: string;
  baseSeq: number;
  mainSeq: number;
  stale: boolean;
  mainEventsSinceBase: number;
  scenarioEvents: number;
  conflicts: ScenarioConflict[];
  labels: Record<string, string>;
}

export interface ApplyPreview {
  scenarioId: string;
  stale: boolean;
  diff: StateDiff;
  commands: { type: string; payload: unknown }[];
  members: Record<string, string>;
}

export type FutureProjection = "plan" | "forecast";

export interface FutureTaskNote {
  done: boolean;
  plannedFinish: string | null;
  expectedDoneByAt: boolean;
  predictedFinish: string | null;
  predictedDoneByAt: boolean;
}

export interface FutureView {
  at: string;
  projection: FutureProjection;
  baseDate: string;
  plannedFinish: string | null;
  forecastFinish: string | null;
  risk: "LOW" | "MEDIUM" | "HIGH" | null;
  summary: { open: number; doneByAt: number; stillOpenAfterAt: number };
  tasks: Record<string, FutureTaskNote>;
}

// --- Structured AI scenario tools -------------------------------------------
// A ScenarioChange is a single machine-verifiable edit proposal. It maps 1:1
// onto a domain command at materialization time; the AI never touches Main.

export type ScenarioChange =
  | {
      tool: "task.reschedule";
      taskId: string;
      params: { startDate?: string | null; dueDate?: string | null };
      reason: string;
    }
  | {
      tool: "task.reestimate";
      taskId: string;
      params: { estimateMinutes: number };
      reason: string;
    }
  | {
      tool: "task.reprioritize";
      taskId: string;
      params: { priority: TaskPriority };
      reason: string;
    }
  | { tool: "task.descope"; taskId: string; reason: string }
  | { tool: "launch.move"; params: { launchDate: string }; reason: string };

export interface ScenarioSuggestion {
  name: string;
  rationale: string;
  source: "deterministic" | "llm";
  changes: ScenarioChange[];
}

export interface ForecastExplanation {
  riskSummary: string;
  criticalPathSummary: string | null;
  conflictSummaries: string[];
}

export const SCHEMA_VERSION = 1;
