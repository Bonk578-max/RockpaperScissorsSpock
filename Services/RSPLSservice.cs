using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPSLS.Services
{
    public class RSPLSservice
    {
        //rock beats scissors and lizard
        //paper beats rock and spock
        //scissors beats paper and lizard
        //lizard beats spock and paper
    public string GetCpuChoice()
{
    string[] options = [ "rock", "paper", "scissors", "lizard", "spock" ];
    return options[new Random().Next(options.Length)];
}
    }
}