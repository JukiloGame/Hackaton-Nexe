using PluriConnect_Api.Services;
using PluriConnect_Api.Database;

namespace PluriConnect_Api.Extensions;
public static class CrudExtensions
{
	public static void MapCrud<T> (this IEndpointRouteBuilder app, string route) where T : class, new()
	{
		// GET ALL
		app.MapGet($"{route}", async (GenericService<T> service) =>
		{
			try
			{
			return Results.Ok( await service.GetAll() );
			} catch (Exception ex)
			{
				return Results.Problem(ex.Message);
			}	
		});
		// GET BY ID
		app.MapGet($"{route}/{{id}}", async (int id, GenericService<T> service) =>
		{
			try
			{
				var entity = await service.GetById(id);
				return entity != null ? Results.Ok(entity) : Results.NotFound();
			}
			catch (Exception ex)
			{
				return Results.Problem(ex.Message);
			}
		});
		// POST CREATE
		app.MapPost($"{route}", async (T entity, GenericService<T> service) =>
		{
			try
			{
				await service.Insert(entity);
				return Results.CreatedAtRoute($"{route}/{{id}}", new { id = entity.GetType().GetProperty("Id")?.GetValue(entity) }, entity);
			}
			catch (Exception ex)
			{
				return Results.Problem(ex.Message);
			}
		});

		// PUT UPDATE
		app.MapPut($"{route}", async (int id, T entity, GenericService<T> service) =>
		{
			try
			{
				var existing = await service.GetById(id);
				if (existing == null) return Results.NotFound();

				SetId(entity, id);
				var updated = await service.Update(entity);
				if (!updated) return Results.Problem("No se pudo actualizar el recurso");

				return Results.NoContent();
			}
			catch (Exception ex)
			{
				return Results.Problem(ex.Message);
			}
		});
		// DELETE
		app.MapDelete($"{route}/{{id}}", async (int id, GenericService<T> service) =>
		{
			try
			{
				var deleted = await service.Delete(id);
				if (!deleted) return Results.NotFound();

				return Results.NoContent();
			}
			catch (Exception ex)
			{
				return Results.Problem(ex.Message);
			}
		});
	}
		// Helpers
    private static int GetId<T>(T obj)
    {
        var prop = typeof(T).GetProperty("Id");
        return (int)(prop?.GetValue(obj) ?? 0);
    }

    private static void SetId<T>(T obj, int id)
    {
        var prop = typeof(T).GetProperty("Id");
        prop?.SetValue(obj, id);
    }
}