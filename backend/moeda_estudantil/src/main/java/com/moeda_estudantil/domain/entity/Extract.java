package com.moeda_estudantil.domain.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "extrato")
public class Extract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "aluno_id", insertable = false, updatable = false)
    private Long studentId;

    @Column(name = "professor_id", insertable = false, updatable = false)
    private Long professorId;

    @Column(name = "tipo_operacao", nullable = false, length = 50)
    private String operationType;

    @Column(nullable = false)
    private Integer value;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "data_operacao", nullable = false)
    private LocalDateTime operationDate = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "aluno_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "professor_id")
    private Professor professor;

    // Constructors
    public Extract() {}

    public Extract(Long id, Long studentId, Long professorId, String operationType,
                   Integer value, String description, LocalDateTime operationDate,
                   Student student, Professor professor) {
        this.id = id;
        this.studentId = studentId;
        this.professorId = professorId;
        this.operationType = operationType;
        this.value = value;
        this.description = description;
        this.operationDate = operationDate;
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

    public String getOperationType() {
        return operationType;
    }

    public void setOperationType(String operationType) {
        this.operationType = operationType;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getOperationDate() {
        return operationDate;
    }

    public void setOperationDate(LocalDateTime operationDate) {
        this.operationDate = operationDate;
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