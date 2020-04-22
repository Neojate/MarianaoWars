﻿// <auto-generated />
using System;
using MarianaoWars.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MarianaoWars.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("IdentityServer4.EntityFramework.Entities.DeviceFlowCodes", b =>
                {
                    b.Property<string>("UserCode")
                        .HasColumnType("varchar(200) CHARACTER SET utf8mb4")
                        .HasMaxLength(200);

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasColumnType("varchar(200) CHARACTER SET utf8mb4")
                        .HasMaxLength(200);

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4")
                        .HasMaxLength(50000);

                    b.Property<string>("DeviceCode")
                        .IsRequired()
                        .HasColumnType("varchar(200) CHARACTER SET utf8mb4")
                        .HasMaxLength(200);

                    b.Property<DateTime?>("Expiration")
                        .IsRequired()
                        .HasColumnType("datetime(6)");

                    b.Property<string>("SubjectId")
                        .HasColumnType("varchar(200) CHARACTER SET utf8mb4")
                        .HasMaxLength(200);

                    b.HasKey("UserCode");

                    b.HasIndex("DeviceCode")
                        .IsUnique();

                    b.HasIndex("Expiration");

                    b.ToTable("DeviceCodes");
                });

            modelBuilder.Entity("IdentityServer4.EntityFramework.Entities.PersistedGrant", b =>
                {
                    b.Property<string>("Key")
                        .HasColumnType("varchar(200) CHARACTER SET utf8mb4")
                        .HasMaxLength(200);

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasColumnType("varchar(200) CHARACTER SET utf8mb4")
                        .HasMaxLength(200);

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4")
                        .HasMaxLength(50000);

                    b.Property<DateTime?>("Expiration")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("SubjectId")
                        .HasColumnType("varchar(200) CHARACTER SET utf8mb4")
                        .HasMaxLength(200);

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("varchar(50) CHARACTER SET utf8mb4")
                        .HasMaxLength(50);

                    b.HasKey("Key");

                    b.HasIndex("Expiration");

                    b.HasIndex("SubjectId", "ClientId", "Type");

                    b.ToTable("PersistedGrants");
                });

            modelBuilder.Entity("MarianaoWars.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Email")
                        .HasColumnType("varchar(256) CHARACTER SET utf8mb4")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("FirstName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("LastName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("varchar(256) CHARACTER SET utf8mb4")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("varchar(256) CHARACTER SET utf8mb4")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("UserName")
                        .HasColumnType("varchar(256) CHARACTER SET utf8mb4")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("MarianaoWars.Models.AttackScript", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ArrayScript")
                        .HasColumnType("int");

                    b.Property<int>("BreakpointScript")
                        .HasColumnType("int");

                    b.Property<int>("CollectionScript")
                        .HasColumnType("int");

                    b.Property<int>("ForScript")
                        .HasColumnType("int");

                    b.Property<int>("FunctionScript")
                        .HasColumnType("int");

                    b.Property<int>("IfScript")
                        .HasColumnType("int");

                    b.Property<int>("LambdaScript")
                        .HasColumnType("int");

                    b.Property<int>("ObjectScript")
                        .HasColumnType("int");

                    b.Property<int>("SwitchScript")
                        .HasColumnType("int");

                    b.Property<int>("WhileScript")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("AttackScript");
                });

            modelBuilder.Entity("MarianaoWars.Models.Computer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AttackScriptId")
                        .HasColumnType("int");

                    b.Property<int>("DefenseScriptId")
                        .HasColumnType("int");

                    b.Property<int>("Downloads")
                        .HasColumnType("int");

                    b.Property<int>("EnrollmentId")
                        .HasColumnType("int");

                    b.Property<string>("IpDirection")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<bool>("IsDesk")
                        .HasColumnType("tinyint(1)");

                    b.Property<double>("Memmory")
                        .HasColumnType("double");

                    b.Property<double>("MemmoryUsed")
                        .HasColumnType("double");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("ResourceId")
                        .HasColumnType("int");

                    b.Property<int>("SoftwareId")
                        .HasColumnType("int");

                    b.Property<int>("TalentId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AttackScriptId")
                        .IsUnique();

                    b.HasIndex("DefenseScriptId")
                        .IsUnique();

                    b.HasIndex("EnrollmentId");

                    b.HasIndex("ResourceId")
                        .IsUnique();

                    b.HasIndex("SoftwareId")
                        .IsUnique();

                    b.HasIndex("TalentId")
                        .IsUnique();

                    b.ToTable("Computer");
                });

            modelBuilder.Entity("MarianaoWars.Models.DefenseScript", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AbstractScript")
                        .HasColumnType("int");

                    b.Property<int>("DeprecatedScript")
                        .HasColumnType("int");

                    b.Property<int>("InterfaceScript")
                        .HasColumnType("int");

                    b.Property<int>("OverrideScript")
                        .HasColumnType("int");

                    b.Property<int>("ParseFloatScript")
                        .HasColumnType("int");

                    b.Property<int>("ParseIntScript")
                        .HasColumnType("int");

                    b.Property<int>("TryCatchScript")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("DefenseScript");
                });

            modelBuilder.Entity("MarianaoWars.Models.Enrollment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("InitDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("InstituteId")
                        .HasColumnType("int");

                    b.Property<int>("Rank")
                        .HasColumnType("int");

                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("InstituteId");

                    b.HasIndex("UserId");

                    b.ToTable("Enrollment");
                });

            modelBuilder.Entity("MarianaoWars.Models.Institute", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CloseDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime>("InitDate")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("IsClosed")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("MaxPlayers")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<double>("RateCost")
                        .HasColumnType("double");

                    b.Property<double>("RateTime")
                        .HasColumnType("double");

                    b.Property<int>("RateUpdate")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Institute");
                });

            modelBuilder.Entity("MarianaoWars.Models.Resource", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("Coffe")
                        .HasColumnType("int");

                    b.Property<int>("CoffeLevel")
                        .HasColumnType("int");

                    b.Property<int>("Ingenyous")
                        .HasColumnType("int");

                    b.Property<int>("IngenyousLevel")
                        .HasColumnType("int");

                    b.Property<int>("Knowledge")
                        .HasColumnType("int");

                    b.Property<int>("KnowledgeLevel")
                        .HasColumnType("int");

                    b.Property<int>("Stress")
                        .HasColumnType("int");

                    b.Property<int>("StressLevel")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Resource");
                });

            modelBuilder.Entity("MarianaoWars.Models.Software", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("GeditVersion")
                        .HasColumnType("int");

                    b.Property<int>("GitHubVersion")
                        .HasColumnType("int");

                    b.Property<int>("MySqlVersion")
                        .HasColumnType("int");

                    b.Property<int>("PostManVersion")
                        .HasColumnType("int");

                    b.Property<int>("StackOverFlowVersion")
                        .HasColumnType("int");

                    b.Property<int>("VirtualMachineVersion")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Software");
                });

            modelBuilder.Entity("MarianaoWars.Models.SystemResource", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("BaseCoffe")
                        .HasColumnType("int");

                    b.Property<int>("BaseDownloads")
                        .HasColumnType("int");

                    b.Property<int>("BaseIngenyous")
                        .HasColumnType("int");

                    b.Property<int>("BaseKnowledge")
                        .HasColumnType("int");

                    b.Property<int>("BaseSleep")
                        .HasColumnType("int");

                    b.Property<int>("Coffe")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("IncrementCoffe")
                        .HasColumnType("int");

                    b.Property<double>("IncrementIngenyous")
                        .HasColumnType("double");

                    b.Property<double>("IncrementKnowledge")
                        .HasColumnType("double");

                    b.Property<int>("IncrementSleep")
                        .HasColumnType("int");

                    b.Property<int>("Ingenyous")
                        .HasColumnType("int");

                    b.Property<int>("Knowledge")
                        .HasColumnType("int");

                    b.Property<int>("LastVersion")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<double>("PlusCoffe")
                        .HasColumnType("double");

                    b.Property<double>("PlusDownloads")
                        .HasColumnType("double");

                    b.Property<double>("PlusIngenyous")
                        .HasColumnType("double");

                    b.Property<double>("PlusKnowledge")
                        .HasColumnType("double");

                    b.Property<double>("PlusSleep")
                        .HasColumnType("double");

                    b.Property<int>("Sleep")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("SystemResource");
                });

            modelBuilder.Entity("MarianaoWars.Models.Talent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("DaoLevel")
                        .HasColumnType("int");

                    b.Property<int>("EcbLevel")
                        .HasColumnType("int");

                    b.Property<int>("InheritanceLevel")
                        .HasColumnType("int");

                    b.Property<int>("InjectionLevel")
                        .HasColumnType("int");

                    b.Property<int>("MvcLevel")
                        .HasColumnType("int");

                    b.Property<int>("RefactorLevel")
                        .HasColumnType("int");

                    b.Property<int>("RsaLevel")
                        .HasColumnType("int");

                    b.Property<int>("SftpLevel")
                        .HasColumnType("int");

                    b.Property<int>("SingletonLevel")
                        .HasColumnType("int");

                    b.Property<int>("SslLevel")
                        .HasColumnType("int");

                    b.Property<int>("TcpIpLevel")
                        .HasColumnType("int");

                    b.Property<int>("UdpLevel")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Talent");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(256) CHARACTER SET utf8mb4")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasColumnType("varchar(256) CHARACTER SET utf8mb4")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(128) CHARACTER SET utf8mb4")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderKey")
                        .HasColumnType("varchar(128) CHARACTER SET utf8mb4")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<string>("RoleId")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(128) CHARACTER SET utf8mb4")
                        .HasMaxLength(128);

                    b.Property<string>("Name")
                        .HasColumnType("varchar(128) CHARACTER SET utf8mb4")
                        .HasMaxLength(128);

                    b.Property<string>("Value")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("MarianaoWars.Models.Computer", b =>
                {
                    b.HasOne("MarianaoWars.Models.AttackScript", "AttackScript")
                        .WithOne("Computer")
                        .HasForeignKey("MarianaoWars.Models.Computer", "AttackScriptId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MarianaoWars.Models.DefenseScript", "DefenseScript")
                        .WithOne("Computer")
                        .HasForeignKey("MarianaoWars.Models.Computer", "DefenseScriptId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MarianaoWars.Models.Enrollment", "Enrollment")
                        .WithMany("Computers")
                        .HasForeignKey("EnrollmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MarianaoWars.Models.Resource", "Resource")
                        .WithOne("Computer")
                        .HasForeignKey("MarianaoWars.Models.Computer", "ResourceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MarianaoWars.Models.Software", "Software")
                        .WithOne("Computer")
                        .HasForeignKey("MarianaoWars.Models.Computer", "SoftwareId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MarianaoWars.Models.Talent", "Talent")
                        .WithOne("Computer")
                        .HasForeignKey("MarianaoWars.Models.Computer", "TalentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MarianaoWars.Models.Enrollment", b =>
                {
                    b.HasOne("MarianaoWars.Models.Institute", "Institute")
                        .WithMany("Enrollments")
                        .HasForeignKey("InstituteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MarianaoWars.Models.ApplicationUser", "User")
                        .WithMany("Enrollments")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("MarianaoWars.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("MarianaoWars.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MarianaoWars.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("MarianaoWars.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
