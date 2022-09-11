CREATE TABLE "user" (
  "id" uuid DEFAULT uuid_generate_v4(),
  "email" varchar(20) NOT NULL,
  "username" varchar(10) NOT NULL,
  "password" varchar(150) NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT email_username_unique UNIQUE (email,username)
);

CREATE TABLE "cart" (
  "id" SERIAL,
  "user_id" uuid REFERENCES user(id),
  PRIMARY KEY ("id")
);

CREATE TABLE "product" (
  "id" SERIAL,
  "name" varchar(15) NOT NULL,
  "price" real NOT NULL,
  "img_url" varchar NOT NULL,
  "description" text NOT NULL,
  "category" varchar(20) NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE "cart_item" (
  "cart_id" int,
  "product_id" int,
  "count" int NOT NULL,
  PRIMARY KEY ("cart_id", "product_id"),
  CONSTRAINT "FK_cart_item.cart_id"
    FOREIGN KEY ("cart_id")
      REFERENCES "cart"("id"),
  CONSTRAINT "FK_cart_item.product_id"
    FOREIGN KEY ("product_id")
      REFERENCES "product"("id")
);

CREATE TABLE "order" (
  "id" uuid DEFAULT uuid_generate_v4(),
  "user_id" uuid,
  "status" varchar(10) NOT NULL,
  "date" date NOT NULL,
  "count" int NOT NULL,
  "total_cost" real NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_order.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "user"("id")
);

CREATE TABLE "order_item" (
  "order_id" uuid,
  "product_id" int,
  "count" int NOT NULL,
  PRIMARY KEY ("order_id", "product_id"),
  CONSTRAINT "FK_order_item.order_id"
    FOREIGN KEY ("order_id")
      REFERENCES "order"("id"),
  CONSTRAINT "FK_order_item.product_id"
    FOREIGN KEY ("product_id")
      REFERENCES "product"("id")
);

CREATE INDEX "Key" ON  "order_item" ("count");

