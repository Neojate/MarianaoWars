using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Models
{
    public class AttackScript
    {
        public int Id { get; set; }

        public int IfScript { get; set; }

        public int SwitchScript { get; set; }

        public int ForScript { get; set; }

        public int WhileScript { get; set; }

        public int FunctionScript { get; set; }

        public int LambdaScript { get; set; }

        public int ArrayScript { get; set; }

        public int CollectionScript { get; set; }

        public int ObjectScript { get; set; }

        public int BreakpointScript { get; set; }

        public Computer Computer { get; set; }

        public AttackScript()
        {
            IfScript = 0;
            SwitchScript = 0;
            ForScript = 0;
            WhileScript = 0;
            FunctionScript = 0;
            LambdaScript = 0;
            ArrayScript = 0;
            CollectionScript = 0;
            ObjectScript = 0;
            BreakpointScript = 0;
        }
    }
}
