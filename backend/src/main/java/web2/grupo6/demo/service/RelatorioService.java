package web2.grupo6.demo.service;

import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.lowagie.text.Document;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import lombok.AllArgsConstructor;
import web2.grupo6.demo.repository.SolicitacaoRepository;
import web2.grupo6.demo.repository.projection.ReceitaPorCategoriaProjection;
import web2.grupo6.demo.repository.projection.ReceitaPorDiaProjection;

@Service
@AllArgsConstructor
public class RelatorioService {

    private final SolicitacaoRepository solicitacaoRepository;

    public byte[] gerarRelatorioReceitaPorPeriodo(Date inicio, Date fim) {
        List<ReceitaPorDiaProjection> dados = solicitacaoRepository.buscarReceitasPorPeriodo(inicio, fim);
        
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();

            Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("Relatório de Receitas por Período", fontTitle);
            title.setAlignment(Paragraph.ALIGN_CENTER);
            document.add(title);
            document.add(new Paragraph(" "));

            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);
            
            addTableHeader(table, "Data", "Receita (R$)");

            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
            double totalGeral = 0;

            for (ReceitaPorDiaProjection item : dados) {
                table.addCell(sdf.format(item.getData()));
                table.addCell(String.format("%.2f", item.getValor()));
                totalGeral += item.getValor();
            }

            document.add(table);
            
            document.add(new Paragraph(" "));
            Paragraph totalPara = new Paragraph("Total do Período: R$ " + String.format("%.2f", totalGeral), FontFactory.getFont(FontFactory.HELVETICA_BOLD));
            totalPara.setAlignment(Paragraph.ALIGN_RIGHT);
            document.add(totalPara);

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao gerar PDF", e);
        }
    }

    public byte[] gerarRelatorioReceitaPorCategoria() {
        List<ReceitaPorCategoriaProjection> dados = solicitacaoRepository.buscarReceitasPorCategoria();

        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();

            Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("Relatório de Receitas por Categoria", fontTitle);
            title.setAlignment(Paragraph.ALIGN_CENTER);
            document.add(title);
            document.add(new Paragraph(" "));

            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);

            addTableHeader(table, "Categoria", "Receita (R$)");

            double totalGeral = 0;

            for (ReceitaPorCategoriaProjection item : dados) {
                table.addCell(item.getCategoria());
                table.addCell(String.format("%.2f", item.getValor()));
                totalGeral += item.getValor();
            }

            document.add(table);

            document.add(new Paragraph(" "));
            Paragraph totalPara = new Paragraph("Receita Total Acumulada: R$ " + String.format("%.2f", totalGeral), FontFactory.getFont(FontFactory.HELVETICA_BOLD));
            totalPara.setAlignment(Paragraph.ALIGN_RIGHT);
            document.add(totalPara);

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao gerar PDF", e);
        }
    }

    private void addTableHeader(PdfPTable table, String col1, String col2) {
        Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        
        PdfPCell h1 = new PdfPCell(new Phrase(col1, headFont));
        h1.setHorizontalAlignment(PdfPCell.ALIGN_CENTER);
        table.addCell(h1);

        PdfPCell h2 = new PdfPCell(new Phrase(col2, headFont));
        h2.setHorizontalAlignment(PdfPCell.ALIGN_CENTER);
        table.addCell(h2);
    }
}
