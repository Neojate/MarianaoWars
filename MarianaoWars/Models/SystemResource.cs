using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Models
{
    public class SystemResource
    {
        // Identificador del Recurso de Sistem.a Primary Key Autoincremental
        public int Id { get; set; }

        // Nombre del Recurso del Sistema.
        public string Name { get; set; }

        // Descripción del Recurso del Sistema.
        public string Description { get; set; }

        // Nivel máximo al que se puede subir la mina.
        public int LastVersion { get; set; }

        // Array de puntos que otorga la mina
        public string Increment { get; set; }

        // Arrat de puntos que consume en Sueño.
        public string Sleep { get; set; }


    }
}
