using System;
using System.Collections.Generic;

namespace PluriConnect_Api.Database;

public partial class ChildContact
{
    public int Id { get; set; }

    public int ChildId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public virtual Child Child { get; set; } = null!;
}
