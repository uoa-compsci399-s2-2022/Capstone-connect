import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type TeamMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProjectMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CommentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserProjectMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Team {
  readonly id: string;
  readonly Users?: (User | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Team, TeamMetaData>);
  static copyOf(source: Team, mutator: (draft: MutableModel<Team, TeamMetaData>) => MutableModel<Team, TeamMetaData> | void): Team;
}

export declare class User {
  readonly id: string;
  readonly Email?: string | null;
  readonly Password?: string | null;
  readonly FirstName?: string | null;
  readonly LastName?: string | null;
  readonly LikedProjects?: (UserProject | null)[] | null;
  readonly Comments?: (Comment | null)[] | null;
  readonly teamID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Project {
  readonly id: string;
  readonly TeamName: string;
  readonly ProjectName: string;
  readonly Description?: string | null;
  readonly Brief?: string | null;
  readonly Tag?: (string | null)[] | null;
  readonly Image?: string | null;
  readonly Video?: string | null;
  readonly Comments?: (Comment | null)[] | null;
  readonly users?: (UserProject | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Project, ProjectMetaData>);
  static copyOf(source: Project, mutator: (draft: MutableModel<Project, ProjectMetaData>) => MutableModel<Project, ProjectMetaData> | void): Project;
}

export declare class Comment {
  readonly id: string;
  readonly content: string;
  readonly projectID: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Comment, CommentMetaData>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment, CommentMetaData>) => MutableModel<Comment, CommentMetaData> | void): Comment;
}

export declare class UserProject {
  readonly id: string;
  readonly user: User;
  readonly project: Project;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<UserProject, UserProjectMetaData>);
  static copyOf(source: UserProject, mutator: (draft: MutableModel<UserProject, UserProjectMetaData>) => MutableModel<UserProject, UserProjectMetaData> | void): UserProject;
}