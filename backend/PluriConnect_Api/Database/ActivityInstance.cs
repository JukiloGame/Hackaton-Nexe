using System;
using System.Collections.Generic;

namespace PluriConnect_Api.Database;

public partial class ActivityInstance
{
    public int Id { get; set; }

    public int ChildId { get; set; }

    public int ActivityId { get; set; }

    public string AssignedAt { get; set; } = null!;

    public int IsAuthorized { get; set; }

    public string? AuthorizedAt { get; set; }

    public virtual Activity Activity { get; set; } = null!;

    public virtual Child Child { get; set; } = null!;

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
