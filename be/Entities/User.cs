using System.Text.Json.Serialization;

namespace WebApi.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }

        [JsonIgnore]
        public string Password { get; set; }
        public string Name { get; set; }

    }
}