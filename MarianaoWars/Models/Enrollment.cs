using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Models
{
    /*
     * Enrollment hace referencia a la matrícula. Es la unión entre la tabla User e Institute.
     */
    public class Enrollment
    {
        // ID del Enrollment. Primary Key Autoincremental.
        public int Id { get; set; }

        // Campo que se relaciona con el ID de la tabla User
        public string UserId { get; set; }

        // Campo que se relaciona con el ID de la tabla Institute
        public int InstituteId { get; set; }

        // Fecha en la que el jugador se matriculó en el servidor
        public DateTime InitDate { get; set; }

        // Posición que ocupa el jugador dentro del ranking del servidor
        public int Rank { get; set; }

        // Usuario al que pertenece la matrícula
        public ApplicationUser User { get; set; }

        // Instituto al que pertenece la matrícula
        public Institute Institute { get; set; }

        // Lista de los ordenadores asociados a la matrícula.
        public List<Computer> Computers { get; set; }

        public Enrollment()
        {

        }

        public Enrollment(ApplicationUser user, Institute institute)
        {
            InitDate = DateTime.Now;
            Rank = 0;
            User = user;
            Institute = institute;
        }

    }
}
