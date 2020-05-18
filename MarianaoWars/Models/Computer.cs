using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Models
{
    /*
     * Computer hace referencia al ordenador (planeta).
     */
    public class Computer
    {
        // ID del Ordenador. Primary Key Autoincremental
        [Key]
        public int Id { get; set; }

        // Nombre del ordenador.
        public string Name { get; set; }

        // Posición del ordenador en el universo. 192.168.x.y 
        public string IpDirection { get; set; }
        
        // Campo que indica si el Ordenador es la Capital
        public bool IsDesk { get; set; }

        // Indica el rango del ordenador. A más downloads, más rango.
        public int Downloads { get; set; }

        // Campo que señala cuantos programas puede almacenar el ordenador, en megas.
        public double Memmory { get; set; }

        // Campo que indica cuanta memoria se ha utilizado.
        public double MemmoryUsed { get; set; }

        // Campo que se relaciona con la tabla Resource.
        public int ResourceId { get; set; }

        // Campo que se relaciona con la tabla Software.
        public int SoftwareId { get; set; }

        // Campo que se relaciona con la tabla Talent.
        public int TalentId { get; set; }

        // Campo que se relaciona con la tabla Script.
        public int ScriptId { get; set; }

        // Campo que se relaciona con la tabla Enrollment
        public int EnrollmentId { get; set; }

        public Enrollment Enrollment { get; set; }

        // Recurso que utiliza el ordenador.
        public Resource Resource { get; set; }

        // Software que utiliza el ordenador.
        public Software Software { get; set; }

        // Talento que utiliza el ordenador.
        public Talent Talent { get; set; }

        // Scripts almacenados en el ordenador.
        public Script Script{ get; set; }

        public Computer()
        {

        }

        public Computer(string name, string ipDirection, bool isDesk, Resource resource, Software software, Talent talent, Script script, Enrollment enrollment)
        {
            Name = name;
            IpDirection = ipDirection;
            IsDesk = isDesk;
            Downloads = 0;
            Memmory = 8;
            MemmoryUsed = 0;
            Resource = resource;
            Software = software;
            Talent = talent;
            Script = script;
            Enrollment = enrollment;
        }

    }
}
