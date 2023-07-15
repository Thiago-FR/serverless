-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ativo', 'inativo');

-- CreateTable
CREATE TABLE "employee" (
    "matricula" SERIAL NOT NULL,
    "status" "Status" NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailDoGestor" TEXT NOT NULL,
    "dataDeAdmissao" TIMESTAMP(3) NOT NULL,
    "dataDeRecisao" TIMESTAMP,
    "cargo" TEXT NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("matricula")
);
