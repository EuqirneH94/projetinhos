# Correção de cor de exportação Náquiro 001

A evidência `before/` preserva o glTF, o binário e o manifesto anteriores e a falha real do inspector semântico. O modelo e o rig já haviam sido revisados quando a inspeção do navegador encontrou a cabeça verde/escura e os adornos com canais incorretos.

O Blender aceitava multiplicadores HDR nos Color Attributes. A exportação `COLOR_0` em UNSIGNED_SHORT normalizado quantizava os valores acima de 1 com overflow. A correção satura RGBA linear (`.color`, sem conversão extra para sRGB) entre 0 e 1 antes de gravar o .blend rigado e os dois formatos runtime. A base editável continua intacta.

`vertex-color-sanitization.json` mostra as 4.707 componentes limitadas e estatísticas de cada região antes/depois. `inspect-gltf.json` e `inspect-glb.json` leem os buffers reais; a regressão semântica rejeita a pele quase preta do binário anterior. `export-before-after.json` comprova a preservação de geometria, materiais e animações. Um único tangente recalculado tem diferença de 0,0001, explicitamente registrada; o binário não foi adulterado para esconder isso.

Os hashes em SHA256SUMS.txt são os da reexportação corrigida. Relatórios, capturas e renders feitos antes desta etapa não aprovam visualmente os novos bytes. O coordenador executará a inspeção final real no navegador. Windows, GPU física e aceite artístico do usuário continuam pendentes.

`portable-blend.json` comprova a abertura real do arquivo corrigido no Blender da nuvem: seis imagens PNG empacotadas, seis atributos lineares todos dentro de [0,1], 46 ossos e 11 actions. A verificação só leu o arquivo; seu SHA-256 permaneceu inalterado. A abertura no Blender Windows do usuário permanece uma verificação externa.
