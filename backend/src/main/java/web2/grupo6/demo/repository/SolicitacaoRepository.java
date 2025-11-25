package web2.grupo6.demo.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import web2.grupo6.demo.entity.Solicitacao;
import web2.grupo6.demo.repository.projection.ReceitaPorCategoriaProjection;
import web2.grupo6.demo.repository.projection.ReceitaPorDiaProjection;

@Repository
public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {

    @Query(value = "SELECT CAST(s.data_fechamento AS DATE) as data, SUM(s.valor_orcamento) as valor " +
                   "FROM solicitacao s " +
                   "WHERE s.estado IN (6) " +
                   "AND (CAST(:inicio AS DATE) IS NULL OR s.data_fechamento >= :inicio) " +
                   "AND (CAST(:fim AS DATE) IS NULL OR s.data_fechamento <= :fim) " +
                   "GROUP BY CAST(s.data_fechamento AS DATE) " +
                   "ORDER BY data", nativeQuery = true)
    List<ReceitaPorDiaProjection> buscarReceitasPorPeriodo(Date inicio, Date fim);

    @Query(value = "SELECT c.nome as categoria, SUM(s.valor_orcamento) as valor " +
                   "FROM solicitacao s " +
                   "JOIN categoria c ON s.categ_equipamento_id = c.id " +
                   "WHERE s.estado IN (6) " +
                   "GROUP BY c.nome " +
                   "ORDER BY valor DESC", nativeQuery = true)
    List<ReceitaPorCategoriaProjection> buscarReceitasPorCategoria();
}
