using System;
using System.Collections.Generic;

namespace PluriConnect_Api.Database;

public partial class Child
{
    public int Id { get; set; }

    public int TutorId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public DateTime BirthDate { get; set; }

    public virtual ICollection<ActivityInstance> ActivityInstances { get; set; } = new List<ActivityInstance>();

    public virtual ICollection<ChildContact> ChildContacts { get; set; } = new List<ChildContact>();

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
