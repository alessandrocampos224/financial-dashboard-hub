# Estrutura do Banco de Dados

## Tabela: tenants

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|----------|-----------|
| id | char(26) | Não | - | Identificador único (ULID) |
| assets | varchar(100) | Não | 'sistema' | Ativos do tenant |
| name | varchar(150) | Não | - | Nome do tenant |
| fantasia | varchar(150) | Não | 'NOME FANTASIA' | Nome fantasia |
| document | varchar(20) | Não | - | CNPJ/CPF |
| ie | varchar(20) | Não | '000000000000' | Inscrição estadual |
| cover | varchar(150) | Sim | NULL | Imagem de capa |
| phone | varchar(20) | Não | '(00)0000-0000' | Telefone |
| email | varchar(120) | Não | 'exemplo@hotmail.com' | Email |
| site | varchar(120) | Não | 'www.exemplo.com' | Site |
| facebook | varchar(100) | Não | '' | Facebook |
| twitter | varchar(100) | Não | '' | Twitter |
| google | varchar(100) | Sim | NULL | Google |
| instagram | varchar(50) | Sim | NULL | Instagram |
| youtube | varchar(50) | Sim | NULL | YouTube |
| zip | varchar(15) | Sim | NULL | CEP |
| district | varchar(100) | Sim | NULL | Bairro |
| street | varchar(150) | Sim | NULL | Rua |
| number | varchar(10) | Sim | NULL | Número |
| complements | varchar(255) | Não | '' | Complemento |
| state | varchar(2) | Não | 'SC' | Estado |
| latitude | varchar(50) | Não | '-28.927672' | Latitude |
| longitude | varchar(50) | Não | '-49.683560899999975' | Longitude |
| description | text | Sim | NULL | Descrição |
| affix | decimal(9,2) | Não | 0.03 | Taxa |
| status | boolean | Sim | true | Status |
| created_at | timestamp | Não | CURRENT_TIMESTAMP | Data de criação |
| updated_at | timestamp | Não | CURRENT_TIMESTAMP | Data de atualização |
| deleted_at | timestamp | Sim | NULL | Data de exclusão |

## Tabela: products

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|----------|-----------|
| id | char(26) | Não | - | Identificador único (ULID) |
| tenant_id | char(26) | Não | - | ID do tenant |
| code | varchar(200) | Não | - | Código do produto |
| type | int(11) | Sim | NULL | Tipo do produto |
| name | varchar(150) | Não | - | Nome do produto |
| subtitle | varchar(255) | Não | - | Subtítulo |
| cover | varchar(255) | Sim | NULL | Imagem de capa |
| categories_id | char(26) | Não | - | ID da categoria |
| brands_id | char(26) | Não | - | ID da marca |
| price | decimal(9,4) | Não | - | Preço |
| interest | decimal(9,4) | Sim | NULL | Taxa de juros |
| amount | decimal(11,4) | Sim | NULL | Quantidade |
| weight | decimal(10,3) | Sim | NULL | Peso |
| stock | int(5) | Sim | NULL | Estoque |
| description | text | Sim | NULL | Descrição |
| status | boolean | Sim | true | Status |
| created_at | timestamp | Não | CURRENT_TIMESTAMP | Data de criação |
| updated_at | timestamp | Não | CURRENT_TIMESTAMP | Data de atualização |
| deleted_at | timestamp | Sim | NULL | Data de exclusão |

## Tabela: users

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|----------|-----------|
| id | char(26) | Não | - | Identificador único (ULID) |
| tenant_id | char(26) | Não | - | ID do tenant |
| type | varchar(25) | Não | - | Tipo de usuário |
| name | varchar(250) | Não | - | Nome |
| fantasia | varchar(250) | Sim | NULL | Nome fantasia |
| cover | varchar(250) | Sim | NULL | Imagem de perfil |
| document | varchar(21) | Não | - | CPF/CNPJ |
| rg | varchar(15) | Sim | NULL | RG |
| ie | varchar(20) | Sim | 'ISENTO' | Inscrição estadual |
| phone | varchar(15) | Sim | NULL | Telefone |
| email | varchar(150) | Não | - | Email |
| password | varchar(255) | Não | - | Senha |
| roles_id | char(26) | Não | - | ID do perfil |
| description | text | Sim | NULL | Descrição |
| status | boolean | Sim | true | Status |
| created_at | timestamp | Não | CURRENT_TIMESTAMP | Data de criação |
| updated_at | timestamp | Não | CURRENT_TIMESTAMP | Data de atualização |
| deleted_at | timestamp | Sim | NULL | Data de exclusão |

## Tabela: roles

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|----------|-----------|
| id | char(26) | Não | - | Identificador único (ULID) |
| tenant_id | char(26) | Não | - | ID do tenant |
| name | varchar(255) | Não | - | Nome do perfil |
| alias | varchar(255) | Não | - | Alias do perfil |
| is_admin | boolean | Sim | false | Flag de administrador |
| description | text | Sim | NULL | Descrição |
| status | boolean | Sim | true | Status |
| created_at | timestamp | Não | CURRENT_TIMESTAMP | Data de criação |
| updated_at | timestamp | Não | CURRENT_TIMESTAMP | Data de atualização |
| deleted_at | timestamp | Sim | NULL | Data de exclusão |

## Tabela: permissions

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|----------|-----------|
| id | char(26) | Não | - | Identificador único (ULID) |
| tenant_id | char(26) | Não | - | ID do tenant |
| roles_id | char(26) | Não | - | ID do perfil |
| name | varchar(255) | Não | - | Nome da permissão |
| alias | varchar(255) | Não | - | Alias da permissão |
| description | text | Sim | NULL | Descrição |
| status | boolean | Sim | true | Status |
| created_at | timestamp | Não | CURRENT_TIMESTAMP | Data de criação |
| updated_at | timestamp | Não | CURRENT_TIMESTAMP | Data de atualização |
| deleted_at | timestamp | Sim | NULL | Data de exclusão |

## Tabela: brands

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|----------|-----------|
| id | char(26) | Não | - | Identificador único (ULID) |
| tenant_id | char(26) | Não | - | ID do tenant |
| name | varchar(150) | Não | - | Nome da marca |
| cover | varchar(50) | Sim | NULL | Imagem da marca |
| description | text | Sim | NULL | Descrição |
| status | boolean | Sim | true | Status |
| created_at | timestamp | Não | CURRENT_TIMESTAMP | Data de criação |
| updated_at | timestamp | Não | CURRENT_TIMESTAMP | Data de atualização |
| deleted_at | timestamp | Sim | NULL | Data de exclusão |

## Tabela: categories

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|----------|-----------|
| id | char(26) | Não | - | Identificador único (ULID) |
| tenant_id | char(26) | Não | - | ID do tenant |
| name | varchar(150) | Não | - | Nome da categoria |
| url | varchar(250) | Não | - | URL amigável |
| description | text | Sim | NULL | Descrição |
| cover | varchar(255) | Sim | NULL | Imagem da categoria |
| status | boolean | Sim | true | Status |
| created_at | timestamp | Não | CURRENT_TIMESTAMP | Data de criação |
| updated_at | timestamp | Não | CURRENT_TIMESTAMP | Data de atualização |
| deleted_at | timestamp | Sim | NULL | Data de exclusão |