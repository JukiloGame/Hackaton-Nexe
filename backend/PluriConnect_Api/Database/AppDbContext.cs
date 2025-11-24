using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace PluriConnect_Api.Database;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Activity> Activities { get; set; }

    public virtual DbSet<ActivityInstance> ActivityInstances { get; set; }

    public virtual DbSet<Child> Children { get; set; }

    public virtual DbSet<ChildContact> ChildContacts { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlite("Data Source=Data/pluriconnect.db");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ActivityInstance>(entity =>
        {
            entity.HasIndex(e => e.ActivityId, "IX_ActivityInstances_ActivityId");

            entity.HasIndex(e => e.ChildId, "IX_ActivityInstances_ChildId");

            entity.HasOne(d => d.Activity).WithMany(p => p.ActivityInstances).HasForeignKey(d => d.ActivityId);

            entity.HasOne(d => d.Child).WithMany(p => p.ActivityInstances).HasForeignKey(d => d.ChildId);
        });

        modelBuilder.Entity<ChildContact>(entity =>
        {
            entity.HasIndex(e => e.ChildId, "IX_ChildContacts_ChildId");

            entity.HasOne(d => d.Child).WithMany(p => p.ChildContacts).HasForeignKey(d => d.ChildId);
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasIndex(e => e.ActivityInstanceId, "IX_Comments_ActivityInstanceId");

            entity.HasIndex(e => e.ChildId, "IX_Comments_ChildId");

            entity.HasOne(d => d.ActivityInstance).WithMany(p => p.Comments).HasForeignKey(d => d.ActivityInstanceId);

            entity.HasOne(d => d.Child).WithMany(p => p.Comments).HasForeignKey(d => d.ChildId);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
