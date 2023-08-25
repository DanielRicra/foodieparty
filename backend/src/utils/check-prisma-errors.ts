import { NotFoundException } from "@nestjs/common";

export const checkPrismaErrorCode = (errorCode: string, metaTarget: string) => {
  if (errorCode === 'P2025') {
    throw new NotFoundException('Record required but not found:' , metaTarget);
  }

  if (errorCode === 'P2003') {
    throw new NotFoundException('Foreign key constraint failed. ', metaTarget);
  }
}