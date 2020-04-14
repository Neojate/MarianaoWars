using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Models
{
    public class DefenseScript
    {

        public int Id { get; set; }

        public int ParseIntScript { get; set; }

        public int ParseFloatScript { get; set; }

        public int DeprecatedScript { get; set; }

        public int OverrideScript { get; set; }

        public int InterfaceScript { get; set; }

        public int AbstractScript { get; set; }

        public int TryCatchScript { get; set; }

        public Computer Computer { get; set; }

        public DefenseScript()
        {
            ParseIntScript = 0;
            ParseFloatScript = 0;
            DeprecatedScript = 0;
            OverrideScript = 0;
            InterfaceScript = 0;
            AbstractScript = 0;
            TryCatchScript = 0;
        }
    }
}
