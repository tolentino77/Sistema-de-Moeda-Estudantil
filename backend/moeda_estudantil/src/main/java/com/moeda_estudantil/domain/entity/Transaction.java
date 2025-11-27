package com.moeda_estudantil.domain.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transacao")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "aluno_id", insertable = false, updatable = false)
    private Long studentId;

    @Column(name = "professor_id", insertable = false, updatable = false)
    private Long professorId;

    @Column(name = "valor_moedas", nullable = false)
    private Integer coinValue;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(name = "data_transacao", nullable = false)
    private LocalDateTime transactionDate = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "aluno_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "professor_id", nullable = false)
    private Professor professor;

    // Constructors
    public Transaction() {}

    public Transaction(Long id, Long studentId, Long professorId, Integer coinValue,
                       String message, LocalDateTime transactionDate, Student student, Professor professor) {
        this.id = id;
        this.studentId = studentId;
        this.professorId = professorId;
        this.coinValue = coinValue;
        this.message = message;
        this.transactionDate = transactionDate;
        this.student = student;
        this.professor = professor;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getProfessorId() {
        return professorId;
    }

    public void setProfessorId(Long professorId) {
        this.professorId = professorId;
    }

    public Integer getCoinValue() {
        return coinValue;
    }

    public void setCoinValue(Integer coinValue) {
        this.coinValue = coinValue;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Professor getProfessor() {
        return professor;
    }

    public void setProfessor(Professor professor) {
        this.professor = professor;
    }
}