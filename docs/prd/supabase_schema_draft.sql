-- Metamorphosis Ivette Personal Lab - Supabase Schema Draft

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique,
  display_name text not null,
  timezone text default 'America/Mexico_City',
  language text default 'es',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists wellness_checkins (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  checkin_date date not null default current_date,
  mood text,
  energy int check (energy between 1 and 10),
  sleep_quality int check (sleep_quality between 1 and 10),
  body_note text,
  water_ml int default 0,
  created_at timestamptz default now()
);

create table if not exists journal_entries (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  title text,
  body text not null,
  mood text,
  energy int,
  tags text[] default '{}',
  source_type text default 'manual',
  is_private boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists habits (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  title text not null,
  domain text not null,
  schedule text default 'daily',
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists habit_logs (
  id uuid primary key default gen_random_uuid(),
  habit_id uuid references habits(id) on delete cascade,
  profile_id uuid references profiles(id) on delete cascade,
  completed_at timestamptz default now(),
  log_date date not null default current_date,
  note text,
  unique(habit_id, log_date)
);

create table if not exists nutrition_plans (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  label text not null,
  source_document_id uuid,
  effective_month text,
  calories int,
  protein_g int,
  carbs_g int,
  fat_g int,
  weight_kg numeric,
  bmi numeric,
  active boolean default false,
  notes text,
  created_at timestamptz default now()
);

create table if not exists nutrition_plan_meals (
  id uuid primary key default gen_random_uuid(),
  nutrition_plan_id uuid references nutrition_plans(id) on delete cascade,
  option_label text,
  meal_type text,
  title text,
  ingredients text,
  created_at timestamptz default now()
);

create table if not exists recipes (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  title text not null,
  description text,
  meal_type text,
  tags text[] default '{}',
  servings int default 1,
  calories int,
  protein_g int,
  carbs_g int,
  fat_g int,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists recipe_ingredients (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid references recipes(id) on delete cascade,
  item text not null,
  quantity text,
  sort_order int default 0
);

create table if not exists recipe_steps (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid references recipes(id) on delete cascade,
  body text not null,
  sort_order int default 0
);

create table if not exists recipe_portions (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid references recipes(id) on delete cascade,
  profile_label text check (profile_label in ('hers','his','shared')),
  multiplier numeric default 1.0,
  notes text
);

create table if not exists audio_tracks (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  title text not null,
  artist text,
  url text not null,
  mood text,
  tags text[] default '{}',
  created_at timestamptz default now()
);

create table if not exists playlists (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  title text not null,
  description text
);

create table if not exists listening_sessions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  audio_track_id uuid references audio_tracks(id) on delete set null,
  listened_at timestamptz default now(),
  duration_seconds int,
  note text
);

create table if not exists source_documents (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  title text not null,
  source_type text,
  storage_path text,
  extracted_text text,
  created_at timestamptz default now()
);

create table if not exists memory_items (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  title text,
  body text not null,
  memory_type text default 'note',
  source_document_id uuid references source_documents(id) on delete set null,
  tags text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists memory_links (
  id uuid primary key default gen_random_uuid(),
  from_memory_id uuid references memory_items(id) on delete cascade,
  to_memory_id uuid references memory_items(id) on delete cascade,
  relation text default 'related'
);

create table if not exists agent_runs (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  agent_name text not null,
  action text not null,
  input jsonb default '{}',
  output jsonb default '{}',
  status text default 'completed',
  created_at timestamptz default now()
);

-- RLS must be enabled and locked to the owner before production deploy.
create table if not exists recipe_import_batches (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  source_name text,
  source_type text check (source_type in ('json','csv','text','manual','agent')) default 'manual',
  raw_payload text,
  imported_count int default 0,
  errors jsonb default '[]',
  created_at timestamptz default now()
);

alter table recipes add column if not exists mode text check (mode in ('hers','his','both')) default 'hers';
alter table recipes add column if not exists import_batch_id uuid references recipe_import_batches(id) on delete set null;

create table if not exists meal_plans (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  title text not null,
  focus text,
  start_date date,
  end_date date,
  target_calories int,
  target_protein_g int,
  grocery_list text[] default '{}',
  note text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists meal_plan_days (
  id uuid primary key default gen_random_uuid(),
  meal_plan_id uuid references meal_plans(id) on delete cascade,
  day_label text not null,
  plan_date date,
  notes text,
  sort_order int default 0
);

create table if not exists meal_plan_items (
  id uuid primary key default gen_random_uuid(),
  meal_plan_day_id uuid references meal_plan_days(id) on delete cascade,
  recipe_id uuid references recipes(id) on delete set null,
  meal_type text check (meal_type in ('breakfast','snack1','lunch','snack2','dinner','other')) not null,
  title_override text,
  portion_label text check (portion_label in ('hers','his','shared')) default 'hers',
  notes text,
  sort_order int default 0
);
