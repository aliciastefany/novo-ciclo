import {SafeAreaView, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, View, Text} from 'react-native';
import {useState, useContext} from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {UserContext} from '../ContextPerfil';

const materiais = [
  {
    id: 'a1',
    titulo: 'Plástico',
    descricao: 'Saiba mais sobre o plástico!',
    imagem: require('../assets/plastico.png'),
    imagem_itens: require('../assets/plastico_itens.png'),
    texto1: 'Plástico é um material sintético, composto por macromoléculas orgânicas chamadas polímeros.',
    texto2: 'Garrafas pet, tubos, caixas, lixeiras, sacolas, luvas, embalagens de alimentos (embalagens de arroz, feijão, açúcar, sal, etc), entre outros...',
    texto3: 'Redução de lixo nos aterros sanitários, diferentes utensílios, menor extração de recursos e emissão de gases tóxicos...',
    kg: 7,
    cor: '#6b803b',
    corLegenda: '#6545ff',
  },

   {
    id: 'a2',
    titulo: 'Papel',
    imagem: require('../assets/papel.png'),
    imagem_itens: require('../assets/papel_itens.png'),
    descricao: 'Saiba mais sobre o papel!',
    texto1: 'O papel é um material de origem orgânica, constituído por fibras de origem vegetal entrelaçados e distribuídos na forma de folhas ou rolos.',
    texto2: 'Papel sulfite, papel couché, papel offset, papel térmico, papel vegetal, crepom, almaço, celofane, carbono, cartolina.',
    texto3: 'A reciclagem de papel contribui diretamente para a preservação dos recursos naturais (matéria-prima, energia e água), redução da poluição e da geração de resíduos urbanos sólidos.',
    kg: 8,
    cor: '#31420a',
    corLegenda: '#6b7f3b'
  },

  {
    id: 'a3',
    titulo: 'Papelão',
    descricao: 'Saiba mais sobre o papelão!',
    imagem: require('../assets/papelao.png'),
    imagem_itens: require('../assets/papelao_itens.png'),
    texto1: 'O papelão é um tipo mais grosso e resistente de papel. É produzido dos papéis compostos das fibras da celulose, que são virgens ou reciclados.',
    texto2: 'Geralmente utilizado na fabricação de caixas, podendo ser liso ou enrugado.',
    texto3: 'É um dos produtos mais utilizados na fabricação de embalagens, estando bastante presente no dia a dia da população. Assim, há vantagens ambientais e para as empresas que o utilizam em seus processos produtivos.',
    kg: 8.5,
    cor: '#6b803b',
    corLegenda: '#000000'
  },

  {
    id: 'a4',
    titulo: 'Metal',
    descricao: 'Saiba mais sobre o metal!',
    imagem: require('../assets/metal.png'),
    imagem_itens: require('../assets/metal_itens.png'),
    texto1: 'Metais são elementos caracterizados pelo brilho, resistência, condutividade térmica e elétrica, sendo aplicáveis em praticamente todos os processos industriais.',
    texto2: 'Ligas metálicas (ferramentas), jóias, moedas e  processos químicos responsáveis pelo funcionamento de pilhas e baterias.',
    texto3: 'Ajuda a conservar recursos preciosos, como ferro, alumínio, cobre e outros, reduzindo a necessidade de extrair novos minérios. AJuda a reduzir emissões de CO2, pois a produção de metais a partir de minérios virgens emite intensivamente.',
    kg: 10,
    cor: '#31420a',
    corLegenda: '#0000ff'
  },

  {
    id: 'a5',
    titulo: 'Vidro',
    descricao: 'Saiba mais sobre o vidro!',
    imagem: require('../assets/vidro.png'),
    imagem_itens: require('../assets/vidro_itens.png'),
    texto1: 'O vidro é feito de uma mistura de matérias-primas naturais: a partir da fusão de areia de sílica com outros componentes, como sódio, cálcio, magnésio, alumina e potássio.',
    texto2: 'Para-brisas, lâmpadas, garrafas, compotas, frascos, recipientes, copos, janelas, lentes, tela de televisores e monitores.',
    texto3: 'Colabora para que o material não vire entulho nos aterros sanitários e na natureza – no solo, em rios, lagos e matas –, contribuindo muito com o meio ambiente. Além disso, a reciclagem economiza energia.',
    kg: 15,
    cor: '#6b803b',
    corLegenda: '#bacb95'
  },

  {
    id: 'a6',
    titulo: 'Madeira',
    descricao: 'Saiba mais sobre a madeira!',
    imagem: require('../assets/madeira.png'),
    imagem_itens: require('../assets/madeira_itens.png'),
    texto1: 'A madeira pode ser definida como o tecido lenhoso das árvores, sendo o principal produto mercantil florestal. É obtida do corte das árvores.',
    texto2: 'Móveis, tábuas, artigos de luxo, instrumentos musicais, palanques, pisos laminados, barcos.',
    texto3: 'Evitar o desmatamento e minimizar os danos causados à natureza: a extração e o descarte indevido da madeira geram impactos negativos no meio ambiente.',
    kg: 17,
    cor: '#31420a',
    corLegenda: '#ff00ff'
  },

  {
    id: 'a7',
    titulo: 'Eletrônicos',
    descricao: 'Saiba mais sobre os eletrônicos!',
    imagem: require('../assets/eletronico.png'),
    imagem_itens: require('../assets/eletronicos_itens.jpg'),
    texto1: 'São os equipamentos que precisam de energia para funcionar (seja ela elétrica ou recebida de bateria ou pilha) ou geram, transmitem ou transformam energia.',
    texto2: 'Smartphones, tablets, laptops, televisores, câmeras digitais, consoles de videogame, monitores, mouses, notebooks, óculos 3D.',
    texto3: 'Reduz a necessidade de produção de novos dispositivos e diminui as emissões de poluentes provenientes da extração e do processamento de matérias-primas. Além disso, evita-se a liberação de gases tóxicos que ocorreriam pelo descarte inadequado.',
    kg: 19,
    cor: '#6b803b',
    corLegenda: '#ff0000'
  },
];

export default function Home({navigation}){

  const {dados} = useContext(UserContext);

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 0.37, width: '100%'}}>
        <View>
          <ImageBackground source={require('../assets/fundo-home.jpg')} style={estilos.img_fundo} />

          <View style={estilos.opacidade} />

          <View style={estilos.menu}>
            <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
              <MaterialCommunityIcons name="menu" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={estilos.area_text_img_fundo}>
          <Text style={estilos.text_fundo}>Veja sobre a reciclagem dos produtos!</Text>
        </View>
      </View>

       <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
        <View style={estilos.area_btns}>
          <FlatList
            style={{marginTop: 10, marginBottom: 10}}
            data={materiais}
            renderItem={({item})=>(
              <TouchableOpacity style={estilos.btn_materiais} onPress={()=>(navigation.navigate('Itens', {materiais: item}))}>
                <View style={[estilos.geral_btns, {backgroundColor: `${item.cor}`}]}>
                  <View style={{gap: 4, flex: 1, marginRight: 68}}>
                    <Text style={estilos.titulo}>{item.titulo}</Text>
                    <Text style={estilos.descricao}>{item.descricao}</Text>
                  </View>

                  <View style={estilos.cont_img}>
                    <Image source={item.imagem} style={estilos.img} />
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item)=>item.id}
            contentContainerStyle={{gap: 20}}
          />
        </View>

        <View style={estilos.linha} />

        <View style={estilos.pontos}>
          <View style={{flex: 1}}>
            <View style={{alignItems: 'center'}}>
              <Image source={require('../assets/circ_prog.png')} style={{width: 100, height: 100}} />

              <View style={estilos.texto_img}>
                <Text style={{fontWeight: 500, fontSize: 15}}>27,50 kg</Text>
              </View>
            </View>

            <View style={{flex: 1, marginTop: 8}}>
              <FlatList
                data={materiais}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>(
                  <View style={estilos.area_legendas}>
                    <View style={[estilos.bola_leg, {
    backgroundColor: `${item.corLegenda}`}]} />
                    <Text style={estilos.legendas}>{item.titulo}</Text>
                  </View>
                )}
                contentContainerStyle={{gap: 7}}
              />
            </View>
          </View>

          <View style={{flex: 2, alignItems: 'center'}}>
            <View style={{width: '100%', alignItems: 'flex-end', paddingRight: 20}}>
              <View>
                <Text style={{fontSize: 22, fontWeight: 800}}>Seu Progresso</Text>
              </View>

              <View style={{marginTop: 6}}>
                <Text style={estilos.text_prog}>Você já reciclou 27,50 kg de lixo.</Text>
              </View>
            </View>

            <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
              <View style={estilos.card_pontos}>
                <View style={estilos.tit_card}>
                  <Text style={estilos.text_pts}>SEUS PONTOS</Text>
                </View>

                <View style={{gap: 4, width: '70%', alignItems: 'center'}}>
                  <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                    <Text style={{fontSize: 18, fontWeight: 700}}>{dados.pontos}</Text>
                    <Text style={{fontWeight: 500}}>pontos</Text>
                  </View>

                  <View style={{marginTop: -8}}>
                    <Text style={{textAlign: 'center', fontWeight: 500}}>com produtos reciclados</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  img_fundo:{
    width: '100%',
    height: '100%',
    borderTopWidth: 1,
    borderColor: '#31420A8C'
  },

  area_text_img_fundo: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    width: 165
  },

  text_fundo: {
    fontSize: 22,
    color: 'white',
    fontWeight: 700
  },

   opacidade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#31420A8C',  
  },

  area_btns:{
    flex: 1.6,
    marginTop: 7,
    width: '100%',
    marginBottom: 7
  },

  btn_materiais:{
    alignItems: 'center',
  },

  geral_btns:{
    width: 340,
    height: 80,
    borderRadius: 20,
    paddingLeft: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  titulo:{
    color: 'white',
    fontSize: 20,
    fontWeight: 500
  },

  descricao: {
    color: 'white',
    fontWeight: 400
  },

  cont_img: {
    position: 'absolute',
    right: 18,
  },

  img: {
    width: 50,
    height: 50,
  },

  linha:{
    marginBottom: 10,
    backgroundColor: 'black',
    width: '83%',
    height: 1
  },

  pontos: {
    flex: 1, 
    marginBottom: 10, 
    width: '100%',
    flexDirection: 'row',
  },

  area_legendas:{
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    width: '90%',
    left: 17,
  },

  bola_leg:{
    width: 20,
    height: 20,
    borderRadius: 20,
  },

  legendas:{
    fontSize: 15,
  },

  text_prog:{
    fontSize: 15,
    fontWeight: 500
  },

  card_pontos:{
    width: '62%',
    height: '88%',
    backgroundColor: '#6b803b',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    gap: 8,
    paddingVertical: 8,
    marginTop: 7
  },

  tit_card:{
    backgroundColor: 'white',
    height: '30%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },

  text_pts:{
    fontWeight: 700,
    fontSize: 16
  },

  texto_img:{
    position: 'absolute',
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },

  menu:{
    position: 'absolute',
    right: 17,
    top: 20
  },
});