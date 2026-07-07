create extension if not exists pgcrypto;

---------------------------------------
-- CLIENTES
---------------------------------------

create table clientes (
    id uuid primary key default gen_random_uuid(),
    nome text not null,
    email text unique not null,
    telefone text,
    empresa text,
    plano text default 'Premium',
    ativo boolean default true,
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

    cidade text,
    estado text,

    created_at timestamptz default now()
);

---------------------------------------
-- KPI DIÁRIO
---------------------------------------

create table indicadores (

    id uuid primary key default gen_random_uuid(),

    restaurante_id uuid references restaurantes(id) on delete cascade,

    data date default current_date,

    pedidos integer default 0,
    faturamento numeric default 0,

    ticket_medio numeric default 0,

    taxa_aceite numeric default 0,

    tempo_medio integer default 0,

    cancelamentos integer default 0,

    avaliacao numeric default 0,

    cmv numeric default 0,

    lucro numeric default 0,

    created_at timestamptz default now()
);

---------------------------------------
-- DRE
---------------------------------------

create table dre (

    id uuid primary key default gen_random_uuid(),

    restaurante_id uuid references restaurantes(id),

    receita numeric default 0,

    impostos numeric default 0,

    custos numeric default 0,

    despesas numeric default 0,

    lucro numeric default 0,

    created_at timestamptz default now()
);

---------------------------------------
-- ESTOQUE
---------------------------------------

create table estoque (

    id uuid primary key default gen_random_uuid(),

    restaurante_id uuid references restaurantes(id),

    produto text,

    categoria text,

    quantidade numeric,

    unidade text,

    custo numeric,

    validade date,

    minimo numeric,

    created_at timestamptz default now()
);

---------------------------------------
-- AÇÕES / CONSULTORIA
---------------------------------------

create table planos_acao (

    id uuid primary key default gen_random_uuid(),

    restaurante_id uuid references restaurantes(id),

    titulo text,

    descricao text,

    prioridade text,

    status text default 'Pendente',

    created_at timestamptz default now()
);

---------------------------------------
-- HISTÓRICO IA
---------------------------------------

create table ia_historico (

    id uuid primary key default gen_random_uuid(),

    cliente_id uuid references clientes(id),

    pergunta text,

    resposta text,

    tokens integer,

    created_at timestamptz default now()
);
