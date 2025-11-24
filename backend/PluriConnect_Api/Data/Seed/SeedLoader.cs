using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using PluriConnect_Api.Database;

public static class SeedLoader
{
    public static async Task LoadAllJsonAsync(AppDbContext db)
    {
        string seedPath = Path.Combine("Data", "Seed");
        if (!Directory.Exists(seedPath))
		{
			Console.Error.WriteLine("Ruta de seed no encontrada: " + seedPath);
			return;
		}

        var files = Directory.GetFiles(seedPath, "*.json");
        foreach (var file in files)
        {
            string json = await File.ReadAllTextAsync(file);
            string name = Path.GetFileNameWithoutExtension(file).ToLower();

            await LoadSingle(db, name, json);
        }

        await db.SaveChangesAsync();
    }

    private static async Task LoadSingle(AppDbContext db, string name, string json)
    {
        switch (name)
        {
            case "children":
                await UpsertList(db, db.Children, json);
                break;

            case "activities":
                await UpsertList(db, db.Activities, json);
                break;

            case "activityinstances":
                await UpsertList(db, db.ActivityInstances, json);
                break;

            case "childcontacts":
                await UpsertList(db, db.ChildContacts, json);
                break;

            case "comments":
                await UpsertList(db, db.Comments, json);
                break;

            default:
                Console.WriteLine($"Seed ignorado: {name}");
                break;
        }
    }

    private static async Task UpsertList<T>(AppDbContext db, DbSet<T> set, string json) where T : class
    {
        var list = JsonSerializer.Deserialize<List<T>>(json);
        if (list == null) return;

        foreach (var entity in list)
        {
            var idProp = typeof(T).GetProperty("Id");
            int id = (int)(idProp?.GetValue(entity) ?? 0);

            var existing = await set.FindAsync(id);
            if (existing == null)
                set.Add(entity);          // INSERT
            else
                db.Entry(existing).CurrentValues.SetValues(entity); // UPDATE
        }
    }
}
