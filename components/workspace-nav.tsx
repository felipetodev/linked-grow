import { auth } from "@clerk/nextjs";
import { CreateWorkspaceButton } from "./create-workspace-button";

export async function WorkspaceNav() {
  const { userId, sessionClaims } = auth()

  if (!userId) {
    return null
  }

  return <CreateWorkspaceButton membership={sessionClaims?.membership} />
}
