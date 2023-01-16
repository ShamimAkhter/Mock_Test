using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Examination.Models
{
    public partial class ExaminationContext : DbContext
    {
        public ExaminationContext()
        {
        }

        public ExaminationContext(DbContextOptions<ExaminationContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Answer> Answers { get; set; }
        public virtual DbSet<Candidate> Candidates { get; set; }
        public virtual DbSet<CandidateExam> CandidatesExams { get; set; }
        public virtual DbSet<Exam> Exams { get; set; }
        public virtual DbSet<QuestionSet> QuestionSets { get; set; }
        public virtual DbSet<QuestionSetsExam> QuestionSetsExams { get; set; }
        public virtual DbSet<Question> Questions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=localhost;Database=Examination;Trusted_Connection=True;MultipleActiveResultSets=true;Integrated Security = true;TrustServerCertificate=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Answer>(entity =>
            {
                entity.HasKey(e => new { e.ExamId, e.CandidateId, e.QuestionId })
                    .HasName("PK__Answers__598DD811135C4DD8");

                entity.HasOne(d => d.CandidatesExams)
                    .WithMany(p => p.Answers)
                    .HasForeignKey(d => new { d.ExamId, d.CandidateId })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Answers__35BCFE0A");
            });

            modelBuilder.Entity<Candidate>(entity =>
            {
                entity.HasKey(e => e.CandidateId)
                    .HasName("PK__Candidat__DF539B9CC3BD6C78");

                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Candidat__A9D105342AED8119")
                    .IsUnique();

                entity.Property(e => e.Email).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);

                entity.Property(e => e.Password).IsUnicode(false);
            });

            modelBuilder.Entity<CandidateExam>(entity =>
            {
                entity.HasKey(e => new { e.ExamId, e.CandidateId })
                    .HasName("PK__Candidat__F480187E1492DCFB");

                entity.HasOne(d => d.Candidate)
                    .WithMany(p => p.CandidatesExams)
                    .HasForeignKey(d => d.CandidateId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Candidate__Candi__34C8D9D1");

                entity.HasOne(d => d.Exam)
                    .WithMany(p => p.CandidatesExams)
                    .HasForeignKey(d => d.ExamId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Candidate__ExamI__31EC6D26");
            });

            modelBuilder.Entity<Exam>(entity =>
            {
                entity.HasKey(e => e.ExamId)
                    .HasName("PK__Exams__297521C73F31E253");

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<QuestionSet>(entity =>
            {
                entity.HasKey(e => e.QuestionSetId)
                    .HasName("PK__Question__D5617EEC909DBEAD");

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<QuestionSetsExam>(entity =>
            {
                entity.HasKey(e => new { e.QuestionSetId, e.ExamId })
                    .HasName("PK__Question__B7F62CF0BE697B48");

                entity.HasOne(d => d.Exam)
                    .WithMany(p => p.QuestionSetsExams)
                    .HasForeignKey(d => d.ExamId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__QuestionS__ExamI__33D4B598");

                entity.HasOne(d => d.QuestionSet)
                    .WithMany(p => p.QuestionSetsExams)
                    .HasForeignKey(d => d.QuestionSetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__QuestionS__Quest__32E0915F");
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.HasKey(e => e.QuestionId)
                    .HasName("PK__Question__0DC06FAC362AD60B");

                entity.Property(e => e.QuestionText).IsUnicode(false);

                entity.HasOne(d => d.QuestionSet)
                    .WithMany(p => p.Questions)
                    .HasForeignKey(d => d.QuestionSetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Questions__Quest__30F848ED");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
