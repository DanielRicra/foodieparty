-- DropForeignKey
ALTER TABLE "collection" DROP CONSTRAINT "collection_user_id_fkey";

-- DropForeignKey
ALTER TABLE "meal_plan" DROP CONSTRAINT "meal_plan_user_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe" DROP CONSTRAINT "recipe_user_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "recipe_ingredient_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "recipe_ingredient_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tips_and_triks" DROP CONSTRAINT "tips_and_triks_user_id_fkey";

-- AlterTable
ALTER TABLE "collection" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "meal_plan" ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "recipe" ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tips_and_triks" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tips_and_triks" ADD CONSTRAINT "tips_and_triks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_plan" ADD CONSTRAINT "meal_plan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
