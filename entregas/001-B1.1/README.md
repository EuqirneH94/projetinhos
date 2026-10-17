# Ecos dos Faróis — 001-B1.1 candidata

**Missão sem aprovação. Causa original Windows pendente; B2 bloqueado.**

Baixe [EDF-B11.zip](EDF-B11.zip?raw=true) pelo botão **Download raw file** na página do arquivo. Confira [o SHA-256 externo](EDF-B11.zip.sha256). O pacote inclui código/build, patch B1→B1.1, RFC, relatório, evidências brutas, hashes e guia PowerShell.

Linux/Node 24.14.0: build + 50/50 testes (40 anteriores preservados + 10 regressões), 20/20 SQLite, entrada normal, erro provocado, morte forçada, recuperação, concorrência e rollback. Nenhum banco/token/save real incluído. Windows ainda não executado nesta missão.

Leia [o relatório](EDF_001_B1_1_REPORT.md), [a RFC](RFC_001_B1_1.md) e [o guia Windows](EDF_001_B1_1_WINDOWS.md). Não remover locks antigos sem comprovar manutenção exclusiva e preservar backup. Falhas artificiais reproduziram a cadeia do lock órfão, mas não identificam a causa do incidente real.

A calculadora, master e a entrega B1 anterior foram preservados. Esta branch adiciona apenas esta pasta de entrega.
