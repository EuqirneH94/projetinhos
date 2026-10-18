# Blender no seu PC e na nuvem

## O que foi verificado

Nesta sessão há Blender **4.3.2 no Linux da nuvem**. Ele iniciou em background, resolveu os operadores glTF e renderizou a cena padrão de teste. Isso permite trabalhar num futuro `.blend` e exportar assets na nuvem após a aprovação do plano.

Você autorizou o uso do Blender do seu PC, mas não há conexão disponível desta sessão com sua área de trabalho ou com o processo do Blender no Windows. A captura enviada não fornece essa conexão nem comprova a versão instalada. Esta sessão dispõe do Blender na nuvem. Não é necessário instalar um plugin de controle remoto para revisar este plano.

## Conferir a instalação no Windows

No Blender aberto, consulte **Help/Ajuda → About/Sobre** para obter a versão. Opcionalmente, no PowerShell, procure o executável sem alterar instalação ou política do sistema:

```powershell
$blenderCommand = Get-Command blender.exe -ErrorAction SilentlyContinue
if ($blenderCommand) {
    $blenderPath = $blenderCommand.Source
} else {
    $blenderCandidates = @(Get-ChildItem -Path 'C:\Program Files\Blender Foundation\Blender*\blender.exe' -ErrorAction SilentlyContinue)
    if ($blenderCandidates.Count -eq 0) {
        throw 'Blender não encontrado nesse caminho. Copie o caminho do executável da sua instalação para $blenderPath.'
    }
    $blenderPath = $blenderCandidates[0].FullName
}
& $blenderPath --version
if ($LASTEXITCODE -ne 0) { throw 'Falha ao consultar a versão do Blender.' }
```

Se houver mais de uma instalação, escolha explicitamente a mesma versão usada na produção:

```powershell
$blenderPath = 'C:\Program Files\Blender Foundation\Blender 4.3\blender.exe'
& $blenderPath --version
```

Esse caminho é um **exemplo**, não uma detecção do seu PC. A nuvem verificou 4.3.2; a versão e o funcionamento do seu Blender ainda precisam de confirmação local. Os comandos PowerShell são instruções; não foram executados em Windows nesta entrega.

## Fluxo local proposto após a produção

Quando existir o `.blend` da etapa aprovada, abrir uma cópia na mesma versão de Blender e conferir as vistas, materiais, rig e Actions. O arquivo ainda não foi produzido nesta entrega. Não há um GLB novo para copiar para a instalação atual.

Na exportação futura: glTF 2.0, seleção limitada à raiz de exportação/corpo/roupa/armature corretos, animações baked e clips nomeados conforme o manifesto, UV/normais/pesos preservados. Reimportar o resultado numa cena vazia e conferir escala, materiais e clips. A renderização do Blender serve à apresentação artística; o teste final precisa usar o asset exportado dentro do jogo.

Preservar separadamente o arquivo de trabalho `.blend`, texturas fonte e versão exportada. Não salvar a cena sobre uma instalação do jogo nem mover a pasta de dados. O futuro guia de implementação fornecerá os comandos de exportação reproduzíveis e os caminhos reais dos arquivos produzidos.

## Continuar jogando a versão atual

Esta auditoria não altera o launcher nem instala personagem novo. Na pasta onde a Alpha 0.3 já funciona:

```powershell
Set-Location 'C:\caminho\para\Ecos_dos_Farois_Alpha_0_3'
node .\scripts\verify-files.mjs
if ($LASTEXITCODE -ne 0) { throw 'A verificação de arquivos falhou. Confira a instalação antes de iniciar.' }
.\Iniciar_Jogo.ps1
```

Substitua o caminho pela sua pasta real. Não sobreponha um ZIP a bancos/saves; o launcher existente e suas configurações de persistência continuam sendo os da Alpha 0.3. Não se afirma novo aceite do problema B1.1 no Windows a partir desta auditoria.
