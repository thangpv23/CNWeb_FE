using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public interface IContext
    {
        IDbConnection calendar { get; }
    }
   
    public class MyContext : IContext
    {
        private readonly IConfiguration _configuration;

        public MyContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public IDbConnection calendar => new SqlConnection(_configuration.GetConnectionString(nameof(calendar)));

    }
}
