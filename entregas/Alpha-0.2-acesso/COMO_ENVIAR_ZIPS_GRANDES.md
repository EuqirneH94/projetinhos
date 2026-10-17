# Transferência dos anexos maiores que 32 MiB

A missão e o LEIA PRIMEIRO foram recebidos e lidos. A ferramenta de arquivos recusou o ZIP Alpha 0.2 e o ZIP de referências: cada um excede o limite de transferência de 32 MiB. Os arquivos não foram baixados parcialmente nem extraídos; nenhuma alteração no jogo ou nos saves foi feita nesta preparação.

Se houver uma URL direta de download ou repositório/branch com a fonte e imagens, basta informar o endereço. Como alternativa, a ferramenta PowerShell desta pasta divide cada ZIP original em partes de até 24 MiB. Ela **não compacta novamente, não extrai nem altera o ZIP original**. Grava novos arquivos em uma nova pasta, recusa destino existente e gera manifesto com tamanhos e SHA-256.

## Executar no Windows

Baixe `Dividir_Anexos_EDF.ps1` usando **Download raw file**. Abra PowerShell na pasta com os ZIPs e o script. Ajuste os nomes dos ZIPs se forem diferentes:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\Dividir_Anexos_EDF.ps1 -Arquivos '.\Ecos_dos_Farois_Alpha_0_2 (1).zip'
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\Dividir_Anexos_EDF.ps1 -Arquivos '.\Ecos_dos_Farois_Referencias_Visuais.zip'
```

Bypass vale só para essas invocações; não altera a política permanente. O script não foi executado em Windows aqui. Se a política da máquina proibir scripts, não a altere: use a opção de URL/repositório.

Envie **todos** os `.bin` e o `manifesto.json` de cada pasta `...zip-partes`, inclusive o último pedaço menor. Não é necessário reenviar os documentos Markdown. As partes são dados binários, não são ZIPs independentes: não tente abri-las ou extraí-las isoladamente.

O hash original esperado para a Alpha, fornecido no anexo, é:

`8417979eb24a69a3d359c242b321382bf28d573ba120fd08d3e6e2eb5b44ec49`

A reconstituição será verificada contra hashes/tamanhos de cada parte, o manifesto e esse checksum antes de inspecionar ou implementar. O hash da Alpha ainda não foi verificado porque o arquivo não ficou acessível neste ambiente.

## Estado da missão

A análise de vídeo está em REVISAO_PRELIMINAR.md e o checklist está em REQUISITOS_IMPLEMENTACAO.md. Não são evidências de implementação. A Alpha do vídeo diverge da fonte B1.1 disponível, portanto não será substituída por ela. Assim que fonte e referências estiverem acessíveis, a missão continua da inspeção/checkpoint até incrementos, testes e entrega; o aceite Windows/B1.1 anterior permanece pendente até evidência real.
