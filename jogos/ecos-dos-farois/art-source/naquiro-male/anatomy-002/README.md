# Corpo base Náquiro masculino — estudo 002

Abra `naquiro-anatomia-002.blend` em Blender 4.3.2 e use **Save As** antes de editar. O corpo usa material neutro, sem roupas ou acessórios visíveis. A coleção `00_CHECKPOINT_001_OCULTO` conserva os objetos anteriores; as fontes 001 no diretório pai continuam intactas.

As coleções `01`/`02` mostram a anatomia; `03` contém o rig de estudo. `80` é uma comparação do corpo anterior, também neutra. `90` mostra as arestas reais do cage, com subdivisão desativada. Oculte `01`/`02` antes de exibir `80` ou `90`. As câmeras `CAM_front`, `CAM_side`, `CAM_back` e as aproximações já estão no arquivo.

O novo estudo **não foi exportado para o jogo**. Não há migração de dados ou alteração dos saves. Roupas, texturas detalhadas, efeitos, versão feminina e rig final ficam para etapas posteriores. As proporções e a escala técnica de 2,25 unidades são revisáveis, não uma decisão de lore.

## Verificação somente de leitura

No Linux, a partir deste diretório:

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=2 blender -b --threads 2 --python-exit-code 1 --python inspect_study.py -- --blend naquiro-anatomia-002.blend --out /tmp/edf-anatomia-inspecao
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=2 blender -b --threads 2 --python-exit-code 1 --python render_study.py -- --blend naquiro-anatomia-002.blend --out /tmp/edf-anatomia-vistas --engine workbench --views front,side,back
```

Use diretórios novos de evidências para conservar cada execução. Os scripts de inspeção/render não salvam o `.blend` nem exportam assets. Uma falha Python retorna erro de processo com `--python-exit-code 1`.

`inspect_study.py` verifica conectividade, orientação de arestas, áreas, simetria, pesos, materiais e seis poses reais. O PASS estrutural não comprova ausência de auto-interseções nem aprovação artística. O maior estiramento medido no corpo, com braços elevados, foi 3,58×: pesos e corretivos ainda precisam de revisão manual.

## Fontes e reprodução da construção

- `anatomy_body.py`: cage explícito conectado de tronco/membros/mãos/pés e membranas separadas.
- `anatomy_head.py`: pele facial com anéis orbitais/periorais, olhos e barbatanas auriculares.
- `build_study.py`: abre fontes 001 somente para leitura, arquiva objetos, une o pescoço, adapta um rig separado e salva o novo estudo.
- `render_study.py`: vistas neutras, comparação anterior, cage e poses documentadas.
- `inspect_study.py`: auditoria sem reparo automático ou gravação do arquivo.

A construção precisa dos arquivos originais no diretório pai: `base.blend`, `naquiro-male.blend`, `model.py` e `rig_export.py`. O `.blend` entregue abre sem eles; as imagens antigas do checkpoint já estão incorporadas.

Para reproduzir, use um checkout separado da branch da entrega e uma saída **nova**, preservando seus ajustes manuais:

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=2 blender -b --threads 2 --python-exit-code 1 --python build_study.py -- --blend /tmp/naquiro-anatomia-reconstruida.blend --evidence /tmp/edf-anatomia-reconstrucao
```

Não execute o gerador com uma saída que contenha trabalho manual. Não execute o exportador antigo para substituir o runtime neste incremento.

Relatório, vistas, hashes e guia PowerShell: `entregas/Personagens-3D/003-anatomia` na raiz do repositório.
