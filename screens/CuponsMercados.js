import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList, Modal, TextInput, Alert } from 'react-native';
import { mercados } from '../data/dadosMercados';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { useEffect, useState, useContext } from 'react';
import CupomDoMercado from '../components/CupomDoMercado';
import { db } from '../config/firebase';
import { doc, onSnapshot, setDoc, collection, deleteDoc, where, query, serverTimestamp, getDocs, getDoc, updateDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid/non-secure';
import { UserContext } from '../ContextPerfil.js';

export default function CuponsMercados({navigation}) {
  const [cupons, setCupons] = useState([]);
  const [cardAdd, setCardAdd] = useState(false);
  const [preco, setPreco] = useState(0);
  const [desc, setDesc] = useState(0);
  const [itens, setItens] = useState('');
  const [btnRmv, setBtnRmv] = useState(false);

  const { idUser } = useContext(UserContext);

  const novoCupom = async () => {
    const codigo = () => nanoid(10);

    if (!idUser) {
      return;
    }

    if(preco !== 0 && desc !== 0 && itens !== ''){
      try{
        await setDoc(doc(db, 'cupons', codigo()), {
          precoTroca: Number(preco), 
          descPorc: Number(desc),
          itens: itens.toUpperCase(),
          mercado: doc(db, 'mercados', idUser),
          data_criacao: serverTimestamp(),
        });
        
        setCardAdd(false);
        setPreco(0);
        setDesc(0);
        setItens('');
      }
      catch(err){
        console.error(err);
      }
    } else{
      Alert.alert('Preencha todos os campos corretamente!');
    }
  }

  const deletarCupom = async (id) => {
    const buscarResgateUsuarios = async () => {
      try{
        const q = query(collection(db, 'usuario'), where('cuponsResgatadosId', 'array-contains', id));
        const docsSnap = await getDocs(q);
        const lista = docsSnap.docs.map((item)=>({
          idUsuario: item.id,
        }));
        return lista;
      } catch(err){
        console.error(err);
        return [];
      }
    }

    const getReembolso = async () => {
      const lista = await buscarResgateUsuarios();
      if (lista.length === 0){
        return;
      };

      const cupom = await getDoc(doc(db, 'cupons', id));
      const valorReembolso = cupom.data().precoTroca;

      lista.map((item)=>{
        const get = async () => {
          const docUser = await getDoc(doc(db, 'usuario', item.idUsuario));
          const pontos = docUser.data().pontos;
          const pontosAtualizacao = pontos + valorReembolso;
          
          const cuponsResgatados = docUser.data().cuponsResgatados;
          const novoArray1 = cuponsResgatados.filter(item => item.id !== id);

          const cuponsResgatadosId = docUser.data().cuponsResgatadosId;
          const novoArray2 = cuponsResgatadosId.filter(item => item !== id);

          await updateDoc(doc(db, 'usuario', item.idUsuario), {
            pontos: pontosAtualizacao,
            cuponsResgatados: novoArray1,
            cuponsResgatadosId: novoArray2,
          });
        }
        get();
      });
    };

    try{
      await getReembolso();
      await deleteDoc(doc(db, 'cupons', id));
    }
    catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    if (!idUser) {
      return;
    }

    try{
      const coll = collection(db, 'cupons');
      const q = query(coll, where('mercado', '==', doc(db, 'mercados', idUser)));
      const snap = onSnapshot(q, (documentos)=>{
        const listaCupons = documentos.docs.map((doc)=>({
          id: doc.id, 
          precoTroca: doc.data().precoTroca, 
          descPorc: doc.data().descPorc,
          itens: doc.data().itens
        }));
        setCupons(listaCupons);
      });
      return ()=>snap();
    }
    catch(err){
      console.error(err);
    }
  }, [idUser]);

  const porcentagem = (atual) => {
    if(atual > 100){
      alert('Valor máximo: 100%');
    } else {
      setDesc(atual);
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={estilos.cabecalho}>
        <View>
          <TouchableOpacity onPress={()=>navigation.navigate('Descricao')}>
            <MaterialCommunityIcons name='keyboard-backspace' size={40} color='black' />
          </TouchableOpacity>
        </View>
        
        <View>
          <Image source={require('../assets/logo-topo.png')} style={{width: 70, height: 70, borderRadius: 20}} />
        </View>
      </View>

      <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
        <View style={{marginTop: 12}}>
          <Text style={estilos.txt_tit}>CUPONS CADASTRADOS</Text>
        </View>

        <View style={estilos.area_logo}>
          <Image source={mercados[0].logo} style={estilos.logo} />
        </View>

        <TouchableOpacity style={estilos.btnModal} onPress={()=>(setCardAdd(true))}>
          <MaterialCommunityIcons name='plus' color='white' size={30} />
        </TouchableOpacity>

        <Modal visible={cardAdd}>
          <View style={estilos.modal}>
            <View style={estilos.area_add}>
              <View style={{gap: 5, alignItems: 'center'}}>
                <Text style={{fontSize: 15}}>Preço de troca do cupom (pontos):</Text>
                <TextInput placeholder='000' style={estilos.input} keyboardType='numeric' maxLength={3} onChangeText={(txt)=>setPreco(txt)} />
              </View>

              <View style={{gap: 5, alignItems: 'center'}}>
                <Text style={{fontSize: 15}}>Desconto do cupom (%):</Text>
                <TextInput placeholder='000' style={estilos.input} keyboardType='numeric' maxLength={3} onChangeText={(txt)=>porcentagem(txt)} />
              </View>

              <View style={{gap: 5, alignItems: 'center'}}>
                <Text style={{fontSize: 15}}>Item em promoção:</Text>
                <TextInput placeholder='Frios, carnes...' style={estilos.input} maxLength={30} onChangeText={(txt)=>setItens(txt)} />
              </View>
            </View>

            <TouchableOpacity style={estilos.btn_add} onPress={novoCupom}>
              <Text style={{fontSize: 16, color: 'white', fontWeight: 500}}>Adicionar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[estilos.btn_add, {marginTop: 15}]} onPress={()=>{setCardAdd(false)}}>
              <Text style={{fontSize: 16, color: 'white', fontWeight: 500}}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <View style={estilos.area_lista}>
          <View style={estilos.cont_lista}>
            <FlatList
              style={estilos.flatlist}
              data={cupons}
              renderItem={({item})=>(
                <CupomDoMercado setBtnRmv={setBtnRmv} item={item} btnRmv={btnRmv} onPress={()=>deletarCupom(item.id)}/>
              )}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{gap: 20, alignItems: 'center'}}
            />
          </View>
        </View>
      </View>

      <View style={{height: 10}} />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  cabecalho:{
    marginTop: 7,
    width: '100%',
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },

  txt_tit:{
    fontSize: 32,
    fontWeight: 'bold',
    color: '#31420a'
  },

  area_logo:{
    borderTopWidth: 1,
    borderBottomWidth: 1, 
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    height: 160
  },

  logo:{
    width: '80%',
    height: '100%',
  },

  btnModal:{
    backgroundColor: '#31420a',
    borderRadius: 25,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 15,
    top: 235
  },

  modal:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },  

  area_add:{
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
    gap: 20,
  },

  input:{
    borderRadius: 20,
    borderWidth: 1,
    width: 225,
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 0,
    textAlign: 'center',
    fontSize: 16
  },

  btn_add:{
    backgroundColor: '#31420a',
    marginTop: 25,
    width: 150,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
  },

  area_lista:{
    flex: 1,
    width: '100%',
    marginTop: 42
  },

  cont_lista:{
    flex: 1, 
    marginTop: 7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  flatlist:{
    marginVertical: 10, 
    width: '100%', 
  },
});