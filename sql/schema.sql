-- ATIVA UUID
create extension if not exists pgcrypto;

---------------------------------------
-- CLIENTES
---------------------------------------

create table clientes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text,
  telefone text,
  plano text default 'Premium',
  created_at timestamptz default now()
);

---------------------------------------
-- RESTAURANTES
---------------------------------------

create table restaurantes (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid references clientes(id) on delete cascade,
  nome text not null,
  plataforma text,

  taxa_aceite numeric default 0,
  tempo_medio integer default 0,
  cancelamentos integer default 0,
  avaliacao numeric default 0,

  ticket_medio numeric default 0,
  faturamento numeric default 0,
  cmv numeric default 0,

  created_at timestamptz default now()
);

---------------------------------------
-- HISTÓRICO DA IA
---------------------------------------

create table ia_historico (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid references clientes(id),
  pergunta text,
  resposta text,
  created_at timestamptz default now()
);

---------------------------------------
-- ESTOQUE
---------------------------------------

create table estoque (
  id uuid primary key default gen_random_uuid(),
  restaurante_id uuid references restaurantes(id),

  produto text,
  quantidade numeric,
  custo numeric,

  created_at timestamptz default now()
);

---------------------------------------
-- DRE
---------------------------------------

create table dre (
  id uuid primary key default gen_random_uuid(),
  restaurante_id uuid references restaurantes(id),

  receita numeric,
  despesas numeric,
  lucro numeric,

  created_at timestamptz default now()
);
