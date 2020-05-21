using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Models
{
    public class Script
    {
        // Identificador del script. Primary Key autoincremental
        public int Id { get; set; }

        // Caza
        public int Variable { get; set; }

        // Destructor
        public int Conditional { get; set; }

        // Crucero
        public int Iterator { get; set; }

        // Nave carga
        public int Json { get; set; }

        // Nave colonizadora
        public int Class { get; set; }

        // Nave espía
        public int BreakPoint { get; set; }

        // Defensa 1
        public int Throws { get; set; }

        // Defensa 2
        public int TryCatch { get; set; }

        public Script()
        {
            Variable = 0;
            Conditional = 0;
            Iterator = 0;
            Json = 0;
            Class = 0;
            BreakPoint = 0;
            Throws = 0;
            TryCatch = 0;
        }

    }
}
