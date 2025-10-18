
import React from 'react'
import {BookOpen, Mail, Phone, MapPin} from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">English Master</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              A plataforma mais completa para aprender inglês online. 
              Cursos estruturados, professores qualificados e tecnologia 
              avançada para acelerar seu aprendizado.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                YouTube
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="/lessons" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Lições
                </a>
              </li>
              <li>
                <a href="/subscriptions" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Planos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">contato@englishmaster.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Linha de Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 English Master. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer