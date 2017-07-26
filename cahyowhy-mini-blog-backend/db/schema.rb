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

ActiveRecord::Schema.define(version: 20170726040216) do

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

  create_table "imageposts", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "post_id"
    t.string   "imageurl"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id"], name: "index_imageposts_on_post_id", using: :btree
    t.index ["user_id"], name: "index_imageposts_on_user_id", using: :btree
  end

  create_table "images", force: :cascade do |t|
    t.string   "path"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_images_on_user_id", using: :btree
  end

  create_table "imagestatuses", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "status_id"
    t.string   "imageurl"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["status_id"], name: "index_imagestatuses_on_status_id", using: :btree
    t.index ["user_id"], name: "index_imagestatuses_on_user_id", using: :btree
  end

  create_table "likecommentposts", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "commentpost_id"
    t.integer  "post_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["commentpost_id"], name: "index_likecommentposts_on_commentpost_id", using: :btree
    t.index ["post_id"], name: "index_likecommentposts_on_post_id", using: :btree
    t.index ["user_id"], name: "index_likecommentposts_on_user_id", using: :btree
  end

  create_table "likeposts", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id"], name: "index_likeposts_on_post_id", using: :btree
    t.index ["user_id"], name: "index_likeposts_on_user_id", using: :btree
  end

  create_table "notifications", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "link"
    t.string   "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_notifications_on_user_id", using: :btree
  end

  create_table "posts", force: :cascade do |t|
    t.string   "title"
    t.integer  "user_id"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "category"
    t.index ["user_id"], name: "index_posts_on_user_id", using: :btree
  end

  create_table "relationships", force: :cascade do |t|
    t.integer  "follower_id"
    t.integer  "followed_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["followed_id"], name: "index_relationships_on_followed_id", using: :btree
    t.index ["follower_id", "followed_id"], name: "index_relationships_on_follower_id_and_followed_id", unique: true, using: :btree
    t.index ["follower_id"], name: "index_relationships_on_follower_id", using: :btree
  end

  create_table "statuses", force: :cascade do |t|
    t.integer  "user_id"
    t.text     "statustext"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_statuses_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "name"
    t.string   "password_digest"
    t.string   "password"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "imageurl"
  end

  add_foreign_key "commentposts", "posts"
  add_foreign_key "commentposts", "users"
  add_foreign_key "imageposts", "posts"
  add_foreign_key "imageposts", "users"
  add_foreign_key "images", "users"
  add_foreign_key "imagestatuses", "statuses"
  add_foreign_key "imagestatuses", "users"
  add_foreign_key "likecommentposts", "commentposts"
  add_foreign_key "likecommentposts", "posts"
  add_foreign_key "likecommentposts", "users"
  add_foreign_key "likeposts", "posts"
  add_foreign_key "likeposts", "users"
  add_foreign_key "notifications", "users"
  add_foreign_key "posts", "users"
  add_foreign_key "statuses", "users"
end
