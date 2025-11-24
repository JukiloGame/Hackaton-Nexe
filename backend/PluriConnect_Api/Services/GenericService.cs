using Microsoft.EntityFrameworkCore;
using PluriConnect_Api.Database;

public class GenericService<T> where T : class
{
	private readonly AppDbContext _context;
	private readonly DbSet<T> _dbSet;

	public GenericService(AppDbContext context)
	{
		_context = context;
		_dbSet = _context.Set<T>();
	}

	public async Task<IEnumerable<T>> GetAll() =>
		await _dbSet.AsNoTracking().ToListAsync();
	
	public async Task<T?> GetById(int id) =>
		await _dbSet.FindAsync(id);
	
	public async Task Insert(T entity)
	{
		_dbSet.Add(entity);
		await _context.SaveChangesAsync();
	}

	public async Task<bool> Update (T entity)
	{
		_dbSet.Update(entity);
		return await _context.SaveChangesAsync() > 0;
	}

	public async Task<bool> Delete (int id)
	{
		var e = await GetById(id);
		if (e == null) return false;
		_dbSet.Remove(e);
		return await _context.SaveChangesAsync() > 0;
	}

}