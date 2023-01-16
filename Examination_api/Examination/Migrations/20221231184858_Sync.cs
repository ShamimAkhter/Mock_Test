using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Examination.Migrations
{
    public partial class Sync : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.CreateTable(
            //    name: "Candidates",
            //    columns: table => new
            //    {
            //        CandidateId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        Name = table.Column<string>(unicode: false, maxLength: 50, nullable: false),
            //        DateOfBirth = table.Column<DateTime>(type: "date", nullable: false),
            //        Email = table.Column<string>(unicode: false, maxLength: 50, nullable: false),
            //        Password = table.Column<string>(unicode: false, maxLength: 50, nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK__Candidat__DF539B9CC3BD6C78", x => x.CandidateId);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Exams",
            //    columns: table => new
            //    {
            //        ExamId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        Name = table.Column<string>(unicode: false, maxLength: 50, nullable: false),
            //        Description = table.Column<string>(unicode: false, maxLength: 255, nullable: true),
            //        ValidFrom = table.Column<DateTime>(type: "datetime", nullable: false),
            //        ValidTill = table.Column<DateTime>(type: "datetime", nullable: false),
            //        Duration = table.Column<TimeSpan>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK__Exams__297521C73F31E253", x => x.ExamId);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "QuestionSets",
            //    columns: table => new
            //    {
            //        QuestionSetId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        Name = table.Column<string>(unicode: false, maxLength: 50, nullable: false),
            //        Description = table.Column<string>(unicode: false, maxLength: 255, nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK__Question__D5617EEC909DBEAD", x => x.QuestionSetId);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "CandidatesExams",
            //    columns: table => new
            //    {
            //        ExamId = table.Column<int>(nullable: false),
            //        CandidateId = table.Column<int>(nullable: false),
            //        QuestionSetId = table.Column<int>(nullable: false),
            //        StartTime = table.Column<DateTime>(type: "datetime", nullable: true),
            //        EndTime = table.Column<DateTime>(type: "datetime", nullable: true),
            //        Score = table.Column<int>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK__Candidat__F480187E1492DCFB", x => new { x.ExamId, x.CandidateId });
            //        table.ForeignKey(
            //            name: "FK__Candidate__Candi__34C8D9D1",
            //            column: x => x.CandidateId,
            //            principalTable: "Candidates",
            //            principalColumn: "CandidateId",
            //            onDelete: ReferentialAction.Restrict);
            //        table.ForeignKey(
            //            name: "FK__Candidate__ExamI__31EC6D26",
            //            column: x => x.ExamId,
            //            principalTable: "Exams",
            //            principalColumn: "ExamId",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Questions",
            //    columns: table => new
            //    {
            //        QuestionId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        QuestionNumber = table.Column<int>(nullable: false),
            //        QuestionText = table.Column<string>(unicode: false, maxLength: 255, nullable: false),
            //        MaxMarks = table.Column<int>(nullable: false),
            //        QuestionSetId = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK__Question__0DC06FAC362AD60B", x => x.QuestionId);
            //        table.ForeignKey(
            //            name: "FK__Questions__Quest__30F848ED",
            //            column: x => x.QuestionSetId,
            //            principalTable: "QuestionSets",
            //            principalColumn: "QuestionSetId",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "QuestionSetsExams",
            //    columns: table => new
            //    {
            //        QuestionSetId = table.Column<int>(nullable: false),
            //        ExamId = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK__Question__B7F62CF0BE697B48", x => new { x.QuestionSetId, x.ExamId });
            //        table.ForeignKey(
            //            name: "FK__QuestionS__ExamI__33D4B598",
            //            column: x => x.ExamId,
            //            principalTable: "Exams",
            //            principalColumn: "ExamId",
            //            onDelete: ReferentialAction.Restrict);
            //        table.ForeignKey(
            //            name: "FK__QuestionS__Quest__32E0915F",
            //            column: x => x.QuestionSetId,
            //            principalTable: "QuestionSets",
            //            principalColumn: "QuestionSetId",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Answers",
            //    columns: table => new
            //    {
            //        ExamId = table.Column<int>(nullable: false),
            //        CandidateId = table.Column<int>(nullable: false),
            //        QuestionId = table.Column<int>(nullable: false),
            //        AnswerText = table.Column<string>(maxLength: 255, nullable: false),
            //        Marks = table.Column<int>(nullable: false),
            //        AnswerFileLink = table.Column<string>(maxLength: 255, nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK__Answers__598DD811135C4DD8", x => new { x.ExamId, x.CandidateId, x.QuestionId });
            //        table.ForeignKey(
            //            name: "FK__Answers__35BCFE0A",
            //            columns: x => new { x.ExamId, x.CandidateId },
            //            principalTable: "CandidatesExams",
            //            principalColumns: new[] { "ExamId", "CandidateId" },
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateIndex(
            //    name: "UQ__Candidat__A9D105342AED8119",
            //    table: "Candidates",
            //    column: "Email",
            //    unique: true);

            //migrationBuilder.CreateIndex(
            //    name: "IX_CandidatesExams_CandidateId",
            //    table: "CandidatesExams",
            //    column: "CandidateId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Questions_QuestionSetId",
            //    table: "Questions",
            //    column: "QuestionSetId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_QuestionSetsExams_ExamId",
            //    table: "QuestionSetsExams",
            //    column: "ExamId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropTable(
            //    name: "Answers");

            //migrationBuilder.DropTable(
            //    name: "Questions");

            //migrationBuilder.DropTable(
            //    name: "QuestionSetsExams");

            //migrationBuilder.DropTable(
            //    name: "CandidatesExams");

            //migrationBuilder.DropTable(
            //    name: "QuestionSets");

            //migrationBuilder.DropTable(
            //    name: "Candidates");

            //migrationBuilder.DropTable(
            //    name: "Exams");
        }
    }
}
