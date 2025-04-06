# MCP Client API

Esta é uma API REST que permite executar comandos MCP (Model Context Protocol) remotamente.

## Configuração

1. Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente necessárias:
   ```bash
   cp .env.example .env
   ```

2. Configure as seguintes variáveis no arquivo `.env`:
   - `OPENAI_API_KEY`: Sua chave de API do OpenAI
   - `MCP_SERVER_COMMAND`: Comando para iniciar o servidor MCP (geralmente "npx")
   - `MCP_SERVER_ARGS`: Argumentos para o servidor MCP (exemplo: '["@playwright/mcp@latest"]')
   - `OPENAI_MODEL`: Modelo OpenAI a ser usado (opcional, padrão: "gpt-4-turbo-preview")

## Instalação

```bash
# Instalar dependências
deno cache src/api.ts
```

## Executando a API

```bash
deno task api
```

A API estará disponível em `http://localhost:8000`.

## Endpoints

### Listar Ferramentas Disponíveis

```http
GET /tools
```

Retorna uma lista de todas as ferramentas MCP disponíveis.

### Executar uma Ferramenta

```http
POST /tools/:toolName
```

Executa uma ferramenta MCP específica.

Parâmetros:
- `:toolName`: Nome da ferramenta a ser executada
- `body`: Objeto JSON com os argumentos necessários para a ferramenta

Exemplo de uso:

```bash
# Listar ferramentas disponíveis
curl http://localhost:8000/tools

# Executar uma ferramenta
curl -X POST http://localhost:8000/tools/mcp_playwright_browser_navigate \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

## Notas de Segurança

- A API está configurada com CORS permitindo todas as origens (`*`)
- Recomenda-se implementar autenticação e autorização antes de usar em produção
- As chaves de API e outras credenciais sensíveis devem ser mantidas seguras
