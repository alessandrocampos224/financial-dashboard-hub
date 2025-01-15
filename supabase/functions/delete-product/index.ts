import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { productId } = await req.json()
    console.log('Iniciando exclusão do produto:', productId)

    // Primeiro verifica se o produto existe
    const { data: product, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()

    if (fetchError) {
      console.error('Erro ao buscar produto:', fetchError)
      throw new Error('Produto não encontrado')
    }

    // Soft delete do produto
    const { error: deleteError } = await supabase
      .from('products')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', productId)

    if (deleteError) {
      console.error('Erro ao excluir produto:', deleteError)
      throw deleteError
    }

    return new Response(JSON.stringify(product), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Erro na função:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})