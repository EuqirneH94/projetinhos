> **Versão atual: Alpha 0.3 candidata.** Comece por [LEIA_PRIMEIRO](LEIA_PRIMEIRO.md), [guia Windows](docs/WINDOWS_ALPHA_0_3.md), [relatório atual](docs/REPORT_ALPHA_0_3.md) e [cobertura](docs/MATRIZ_ALPHA_0_3.md). Se usar a fonte por Git, rode `npm.cmd ci`, `npm.cmd run build` e `npm.cmd start`; o iniciador com manifesto destina-se ao ZIP de distribuição completo. As seções históricas abaixo descrevem a base anterior e não substituem o relatório desta candidata. Nenhum aceite Windows ou estético é presumido.

# Ecos dos Faróis — Alpha jogável 0.2

Para jogar no Windows, leia **LEIA_PRIMEIRO.md** e abra **Jogar_Ecos_dos_Farois.cmd**.

Esta versão evolui a base B1.1. Usa TypeScript, Three.js, Vite, Node.js 24,
WebSocket e SQLite. Não houve migração para Unreal. O servidor conserva a autoridade
sobre movimento, combate, inventário, identidade e recompensas.

## Desenvolvimento

No PowerShell local, dentro da pasta do projeto:

```powershell
npm.cmd ci --no-audit --no-fund
npm.cmd run dev
```

Abra `http://127.0.0.1:5173/`. O cliente Vite encaminha `/ws` ao servidor local.
O modo de desenvolvimento exige as dependências completas; a cópia enxuta de `ws`
que acompanha a entrega é suficiente apenas para o build pronto.

Para compilar e testar:

```powershell
npm.cmd run check
```

Para executar o build pronto manualmente:

```powershell
$env:DB_PATH = Join-Path (Get-Location) 'data/ecos-alpha.sqlite'
npm.cmd start
```

O servidor abre, por padrão, apenas em loopback. Não constitui hospedagem pública.
Use outro navegador, perfil ou janela anônima para uma segunda identidade de teste.
A mesma chave identifica o mesmo personagem. Contas de teste usam uma única sessão
ativa por conta e recusam a segunda mantendo a primeira.

## Organização

- `client/src`: apresentação 3D, entrada, interface, áudio e rede.
- `client/public/audio`: os sete estudos V1.1 integrados.
- `client/dist`: build pronto do cliente.
- `shared/alpha.ts`: kits experimentais e dados da Alpha.
- `shared/identity.ts`: IDs de facções, povos e classes.
- `server/src`: simulação, protocolo, contas, SQLite e encerramento.
- `build`: código compilado do servidor e módulos compartilhados.
- `tests`: verificações de domínio, rede, interface, persistência e ciclo de processo.
- `docs/ENTREGA_ALPHA_0_2.md`: implementado, limites e decisões futuras.
- `docs/VALIDACAO_ALPHA_0_2.md`: verificações realizadas e limites do ambiente.

Os documentos B1/B1.1 conservados em `docs` são históricos. Para o estado desta
entrega, prevalecem os documentos Alpha 0.2 acima e os testes executados.

## Dados e integridade

Não substitua bancos anteriores por arquivos deste pacote. O iniciador usa um
novo caminho de save; o modo de contas permanece separado. Para backup, encerre o
servidor e copie a pasta `data` completa. Credenciais e bancos não fazem parte do ZIP.

O manifesto SHA-256 pode ser conferido com:

```powershell
node scripts/verify-files.mjs
```

Recompilar ou modificar fontes muda o manifesto esperado. Preserve a entrega
original para comparação. Dependências e licenças estão em THIRD_PARTY_NOTICES.md.

## Procedência

Geometria, materiais, textura de terreno, interface e efeitos foram criados em código.
O áudio V1.1 usa a síntese original do laboratório entregue e revisado nesta conversa.
Não foram incorporadas imagens da Bíblia como se fossem modelos 3D nem assets de WoW.
Esta Alpha não alcança o acabamento artístico das referências conceituais.
