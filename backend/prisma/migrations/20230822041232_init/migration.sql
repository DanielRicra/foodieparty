-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "name" VARCHAR(120),
    "password" VARCHAR(60) NOT NULL,
    "profile_image_url" TEXT,
    "bio" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredient" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(120) NOT NULL,
    "instructions" TEXT,
    "description" TEXT NOT NULL,
    "prep_time" INTEGER,
    "cook_time" INTEGER,
    "total_time" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_ingredient" (
    "id" SERIAL NOT NULL,
    "quantity" DECIMAL(10,2) NOT NULL,
    "unit" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ingredient_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,

    CONSTRAINT "recipe_ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tips_and_triks" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "tips_and_triks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal_plan" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "meal_plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL,
    "rating" SMALLINT NOT NULL,
    "comment" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "recipe_id" INTEGER NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collection" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_recipe_meal_plan" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_recipe_collection" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_recipe_meal_plan_AB_unique" ON "_recipe_meal_plan"("A", "B");

-- CreateIndex
CREATE INDEX "_recipe_meal_plan_B_index" ON "_recipe_meal_plan"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_recipe_collection_AB_unique" ON "_recipe_collection"("A", "B");

-- CreateIndex
CREATE INDEX "_recipe_collection_B_index" ON "_recipe_collection"("B");

-- AddForeignKey
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tips_and_triks" ADD CONSTRAINT "tips_and_triks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_plan" ADD CONSTRAINT "meal_plan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_recipe_meal_plan" ADD CONSTRAINT "_recipe_meal_plan_A_fkey" FOREIGN KEY ("A") REFERENCES "meal_plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_recipe_meal_plan" ADD CONSTRAINT "_recipe_meal_plan_B_fkey" FOREIGN KEY ("B") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_recipe_collection" ADD CONSTRAINT "_recipe_collection_A_fkey" FOREIGN KEY ("A") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_recipe_collection" ADD CONSTRAINT "_recipe_collection_B_fkey" FOREIGN KEY ("B") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
