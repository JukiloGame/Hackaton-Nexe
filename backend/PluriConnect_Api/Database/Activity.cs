using System;
using System.Collections.Generic;

namespace PluriConnect_Api.Database;

public partial class Activity
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateTime Date { get; set; }

    public string Address { get; set; } = null!;

    public virtual ICollection<ActivityInstance> ActivityInstances { get; set; } = new List<ActivityInstance>();
}
