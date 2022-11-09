export type JwtPayload = {
  id: number;
  name: string;
  email: string;
  roleId: number;
  roleName: string;
  universityId?: number;
  createdAt: Date;
};
