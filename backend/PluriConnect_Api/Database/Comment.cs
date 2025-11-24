using System;
using System.Collections.Generic;

namespace PluriConnect_Api.Database;

public partial class Comment
{
    public int Id { get; set; }

    public int ChildId { get; set; }

    public int ActivityInstanceId { get; set; }

    public string Text { get; set; } = null!;

    public string CreatedAt { get; set; } = null!;

    public virtual ActivityInstance ActivityInstance { get; set; } = null!;

    public virtual Child Child { get; set; } = null!;
}
