-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ativo', 'inativo');

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee" (
    "matricula" SERIAL NOT NULL,
    "status" "Status" NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailDoGestor" TEXT NOT NULL,
    "dataDeAdmissao" TIMESTAMP(3) NOT NULL,
    "dataDeRecisao" TIMESTAMP,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("matricula")
);

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
