# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170717134944) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "commentposts", force: :cascade do |t|
    t.text     "comment"
    t.integer  "user_id"
    t.integer  "post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id"], name: "index_commentposts_on_post_id", using: :btree
    t.index ["user_id"], name: "index_commentposts_on_user_id", using: :btree
  end

  create_table "images", force: :cascade do |t|
    t.string   "path"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_images_on_user_id", using: :btree
  end

  create_table "likecommentposts", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "commentpost_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["commentpost_id"], name: "index_likecommentposts_on_commentpost_id", using: :btree
    t.index ["user_id"], name: "index_likecommentposts_on_user_id", using: :btree
  end

  create_table "posts", force: :cascade do |t|
    t.string   "title"
    t.integer  "user_id"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "category"
    t.string   "image"
    t.index ["user_id"], name: "index_posts_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "name"
    t.string   "password_digest"
    t.string   "password"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_foreign_key "commentposts", "posts"
  add_foreign_key "commentposts", "users"
  add_foreign_key "images", "users"
  add_foreign_key "likecommentposts", "commentposts"
  add_foreign_key "likecommentposts", "users"
  add_foreign_key "posts", "users"
end
