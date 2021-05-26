using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Entities
{
    public class Event
    {
        public int Id { get; set; }
        public int Uid { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long StartTime { get; set; }
        public long EndTime { get; set; }
        public long UpdateTime { get; set; }
        public int IsPublic { get; set; }
        public string NameUser { get; set; }

    }
}
